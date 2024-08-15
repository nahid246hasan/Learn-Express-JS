/*
*Title: Static 
*Description: If any static content there in the project then we can use static. As example i have a static
*document or picture in my project. but i can't access this by '/folder_name/file_name'. in this case we need static.
*Author: Nahid Hasan
*Date: Aug 1, 2024
*/

//dependencies
const express=require('express');

const app=express();

//now i have to use express static and have to say that which one is my root static folder
app.use(express.static(__dirname+'/public/',{index:'home.html'}));
//express.static er modhe 2 ta parameter dewa jay. 2nd parameter diye amra default static page set kore dite pari.
//1st parameter diye amra static folder name set kore dite pari. ekhane home er jaygay je html folder echa use kora jabe oi dir er.
//now we can access by api hit "http://localhost:3000/text/test.txt"


//param............................................................ 


//ekhane id is a parameter and it is findable number or index. jokhon id pabe tahole ei function kaj korbe
// app.param('id',(req,res,next,id)=>{
//     req.user_id=id;
//     next();
// });

//important
//suppose(http//localhost:3000/user/5) here 5 is the findable number or index can be. 
//when we want to access or gain it (app.get("/user/:id",(req,res)=>{----------------------(/:id is a parameter)
//}))

app.get('/',(req,res)=>{
    res.send('This is home page with post request');
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});