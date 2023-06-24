

function checkLoggedIn (req, res, next) {
    const isLoggedIn = req.isAuthenticated() && req.user;
    console.log("checkAUTH", req.isAuthenticated());
    
    if(!isLoggedIn) {
        return res.status(200).json({
            success: false, 
            user: null
        })
    }
    next();
}

module.exports = checkLoggedIn;