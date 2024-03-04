const jwt = require('jsonwebtoken');


module.exports = async (req,res,next) => {
    const authHeader = req.get("Authorization");
    let isAuth;
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        req.isAuth = false;
        return next();
    }
    try{
        const decodedToken = jwt.verify(token,'secret');
        if(!decodedToken){
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
    }catch(err){
        req.isAuth = false;
        next();
    }
}