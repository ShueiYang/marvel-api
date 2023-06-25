const jwt = require("jsonwebtoken");

function checkLoggedIn (req, res, next) {
    // const isLoggedIn = req.isAuthenticated() && req.user;
    // console.log("checkAUTH", req.user);
    // const bearerToken = req.headers.authorization;

    // if (!bearerToken) {
    //     return res.status(200).json({
    //         success: false, 
    //         user: null
    //     })
    // }

    // try {
    //     const token = bearerToken.split("")[1]
    //     const decode = jwt.verify(token, process.env.JWT_SECRET);
    //     console.log("chek jwt", decode);
    //     req.user = decode;
    //     next();
        
    // } catch (error) {
    //     return res.status(403).json({error});
    // }
    // if(!isLoggedIn) {
    //     return res.status(200).json({
    //         success: false, 
    //         user: null
    //     })
    // }
    // next();
    // if(!req.headers.cookie) {
    //     return res.status(200).json({
    //         success: false, 
    //         user: null
    //     })
    // }
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