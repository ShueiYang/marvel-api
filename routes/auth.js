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
    (req, res) => {
        // console.log("check USER", req.user)
        const user = req.user;
        const token = jwt.sign(
            user,
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        )
        res.cookie("marvel-jwt", token, {
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 2, // 2 hours
            secure: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none"
        })
        res.redirect(process.env.CLIENT_URL)
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

authRoute.get("/logout", (req, res, next) => {
     //Remove req.user and clears any logged in session
    //  req.logout(function (err) {   
    //     if(err) {
    //         return next(err);
    //     }
    //     res.redirect(process.env.CLIENT_URL)
    // }); 
    // Clear the token on the client-side
    res.clearCookie("marvel-jwt"); 
    res.redirect(process.env.CLIENT_URL);
})


module.exports = authRoute;