const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now
    }
});



todoSchema.methods={
    //this method is for finding all the active todos. self define method.
    findActive: function(){
        return mongoose.model('Todo').find({status:'active'});
    },

    findActiveCallback: function(cb){
        return mongoose.model('Todo').find({status:'active'},cb);
    }
}

module.exports = todoSchema;