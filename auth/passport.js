const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;


const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};

passport.use(new googleStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true
},
    function verifiyCallback(accessToken, refreshToken, profile, done) {
        const user = {
            id: profile.id,
            displayName: profile.displayName,
            photos: profile.photos
        };
         // Generate a JWT with the user data
        // const token = jwt.sign(
        //     user,
        //     process.env.JWT_SECRET,
        //     { expiresIn: "2h"}
        // )
        // Pass the token to the callback
        done(null, user);
    }
));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});