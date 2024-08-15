
const express= require('express');

const mongoose=require('mongoose');

const todoHandler=require('./routeHandler/todoHandler');

const app = express();

app.locals.anything='Nahid Hasan';

const handle=require('./handle.js');

app.param('id',(req,res,next,id)=>{
    req.user={
        id:id,
        name:'Nahid'
    };
    next();
});

app.get('/home/:id',(req,res)=>{
    console.log(req.user);
    res.send('This is home page with post request');
});

app.use(express.json());

//database connection with mongoose
mongoose.connect('mongodb://localhost:27017/todos',{}).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log(err);
})

app.use('/todo',todoHandler);

app.all('/admin',handle);

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})