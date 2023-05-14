

function checkLoggedIn (req, res, next) {
    const isLoggedIn = req.isAuthenticated() && req.user;
    
    if(!isLoggedIn) {
        return res.status(200).json({
            success: false, 
            user: null
        })
    }
    next();
}

module.exports = checkLoggedIn;