const handle=(req,res)=>{
    console.log(req.app.locals.anything);
    res.send('Hello World');
}

module.exports=handle;