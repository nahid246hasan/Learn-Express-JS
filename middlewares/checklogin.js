/*
*Title: Authentication middleware
*Description: In this middleware we will check the token.
*Author: Nahid Hasan
*Date: Jul 8, 2024
*/
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