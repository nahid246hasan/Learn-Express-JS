const mongoose = require('mongoose');

const userSchima=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
    //suppose when we want to show all the todo corresponding to a user. then we have to take array like below.
    todos:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Todo'
        }
    ]
});


module.exports=userSchima;