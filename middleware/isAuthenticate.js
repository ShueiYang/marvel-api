const jwt = require("jsonwebtoken");

function checkLoggedIn (req, res, next) {
    // check the jwt validity
    const accessToken = req.headers.authorization;
    if(!accessToken) {
        return res.status(401).json({
            success: false, 
            message: "Unauthorize"
        })
    }
    const token = accessToken.split(" ")[1]
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
        
    } catch (error) {
        return res.status(403).json({ message: "Forbidden token" });
    }  
}

module.exports = checkLoggedIn;