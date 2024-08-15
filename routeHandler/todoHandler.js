const express=require('express');
const router= express.Router();
const mongoose= require('mongoose');
const todoSchema= require('../schemas/todoSchema');

const Todo= mongoose.model('Todo',todoSchema);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.get('/active-callback',(req,res)=>{
    const todo=new Todo();
    todo.findActiveCallback((err,data)=>{
        res.send(data);
    });
    
});

//GET Active TODOS
//self define function use kore 
router.get('/active',async(req,res)=>{
    const todo=new Todo();
    const data= await todo.findActive();
    try{
        res.send(data);
    }catch(err){
        console.log(err);
    }
});




//GET ALL THE TODOS
router.get('/',async(req,res)=>{
    //first parameter is for filtering
    await Todo.find({status:'active'}).then((data)=>{
        res.send(data);
        /*
            res.status(200).json(data);
        */
    }).catch((err)=>{
        console.log(err);
    })


    //if we want we will response some particular field from the full data..then.....
    //select field er modhe diye dibo ki dekhte chai ar ki chai na.
    //suppose id dekhte na chaile id:0
    // await Todo.find({status:'active'}).select({_id:0}).then((data)=>{
    //     res.send(data);
    // }).catch((err)=>{
    //     console.log(err);    
    //})
});

//GET SINGLE TODO
router.get('/:id',async(req,res)=>{
    await Todo.find({_id:req.params.id}).select({_id:0}).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        console.log(err);
    })
});

//POST A TODO
// Example route handler for creating a new Todo
router.post('/', async (req, res) => {
    try {
        console.log(req.body);

        // Validate if title is provided
        if (!req.body.title) {
            return res.status(400).json({
                error: 'Validation failed',
                message: 'Title is required.',
            });
        }

        // Create a new Todo
        const todo = new Todo(req.body);

        // Save the Todo
        const savedTodo = await todo.save();
        res.status(200).json(savedTodo);

    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({
                error: 'Validation failed',
                message: err.message,
                errors: err.errors,
            });
        } else {
            res.status(500).json({ error: 'Failed to save todo' });
        }
    }
});


//POST MULTIPLE TODOS
router.post('/all',async(req,res)=>{
    await Todo.insertMany(req.body).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(400).json(err);
    })
});

//Put A TODO
router.put('/:id',async(req,res)=>{

    //first parameter ki diye find korbo oita dite hobe,second parameter e ki ki update korte hobe oita dite hobe.
    await Todo.updateOne({_id:req.params.id},{ $set: /*req.body*/{status:'inactive'}}).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(400).json(err);
    })
});

//DELETE A TODO
router.delete('/:id',async(req,res)=>{
    await Todo.deleteOne({_id:req.params.id}).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(400).json(err);
    })
});

module.exports=router;