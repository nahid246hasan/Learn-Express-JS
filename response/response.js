/*
*Title: middleware and response
*Description: here we can see about middleware concept and response.format concept
*Author: Nahid Hasan
*Date: Jul 8, 2024
*/

const express= require('express');
const app=express();


const myMiddleware1=(req,res,next)=>{
    console.log('My Middleware');
    res.send('Hello World middleware');
    next();
}

const myMiddleware2=(req,res,next)=>{
    console.log('My Middleware 2');
    next();
}

app.use(myMiddleware1);
app.use(myMiddleware2);

app.get('/about',(req,res)=>{     
    res.format({
        'text/plain':()=>{
            res.send('Hello World');
        },
        'text/html':()=>{
            res.send('<h1>Hello World</h1>');
        },
        'application/json':()=>{
            res.json({message:'Hello World'});
        },
        default:()=>{
            res.status(406).send('Not Acceptable');
        }
    });
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});


