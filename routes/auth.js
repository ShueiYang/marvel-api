const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const checkLoggedIn = require("../middleware/isAuthenticate");

const authRoute = express.Router();


authRoute.get("/google",
    passport.authenticate("google", {
        scope: ["email", "profile"]
    })
)

authRoute.get("/google/callback", 
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/failure",
        // successRedirect: process.env.CLIENT_URL
    }),
    // Generate a JWT with the user data
    (req, res) => {
        const user = req.user;
        const token = jwt.sign(
            user,
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        )
        res.redirect(`${process.env.CLIENT_URL}/oauth/google/callback?token=${token}`)
    }
)

authRoute.get("/failure", (req, res) => {
    res.status(401).json({ message: "Access denied"})    
});

authRoute.get("/login", checkLoggedIn, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
})

// authRoute.get("/logout", (req, res, next) => {
//     // Remove req.user and clears any logged in session
//      req.logout(function (err) {   
//         if(err) {
//             return next(err);
//         }
//         res.redirect(process.env.CLIENT_URL)
//     }); 
// })

module.exports = authRoute;