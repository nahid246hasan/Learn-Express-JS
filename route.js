const express= require('express');
const app= express();

app.get('/',(req,res)=>{
    res.send('Hello World with get request');
});



//suppose '/' route e emon onek route ache. evabe barbar kora jhamela.
//for this we use route method.
// app.post('/',(req,res)=>{
//     res.send('Hello World with post request');
// });

// app.put('/',(req,res)=>{
//     res.send('Hello World with put request');
// });

// app.delete('/',(req,res)=>{
//     res.send('Hello World with delete request');
// });

// app.listen(3000,()=>{
//     console.log('Listening on port 3000');
// })



//except route method

app.route('/').get((req,res)=>{
    res.send('Hello World with get request');
}).post((req,res)=>{
    res.send('Hello World with post request');
}).put((req,res)=>{
    res.send('Hello World with put request');
}).delete((req,res)=>{
    res.send('Hello World with delete request');
});