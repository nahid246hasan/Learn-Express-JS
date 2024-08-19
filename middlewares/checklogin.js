const jwt= require('jsonwebtoken');
const checklogin=(req,res,next)=>{
    const {authorization}=req.headers;

    try{
        const token=authorization.split(' ')[1];
        const decoded=jwt.verify(token,process.env.JWT_Secret);
        const {username,userId}=decoded;
        req.username=decoded.username;
        req.userId=decoded.userId;
        next();
    }
    catch{
        next("Authentication Error");
    }
}

module.exports=checklogin;