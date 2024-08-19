const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const userSchema= require('../schemas/userSchema');
const bcrypt= require('bcrypt');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const User= mongoose.model('User',userSchema);
const jwt= require('jsonwebtoken');

router.post('/signup',async(req,res)=>{
    try{
        const hashedPassword= await bcrypt.hash(req.body.password,10);
        const newUser= new User({
            name:req.body.name,
            username:req.body.username,
            password: hashedPassword
        });

        const data= await newUser.save();
        res.status(200).json({
            message:'User created successfully',
            data:data
        });
    }catch(err){
        res.status(500).json({
            message:'Something went wrong',
            error:err
        });
    }
});

router.post('/login',async(req,res)=>{
    try{
        const user= await User.find({username:req.body.username});
        if(user && user.length>0){
            const isValidPassword=await bcrypt.compare(req.body.password,user[0].password);
            if(isValidPassword){
                //tokenGeneration
                token=jwt.sign({
                    username:user[0].username,
                    userId:user[0]._id
                },process.env.JWT_Secret, {expiresIn: '1h'});
                console.log(token);
                console.log(user[0].username);
                res.status(200).json({
                    "Access token":token,
                    "Message": "Login successful"
                })
            }
            else{
                res.status(401).json({
                    message:'Login failed'
                })
            }
        }
        else{
            res.status(401).json({
                message:'Login failed'
            })
        }
    }catch(err){
        res.status(500).json({
            message:'Something went wrong',
            error:err
        }); 
    }
})

router.get('/all',async(req,res)=>{
    try{
        const data= await User.find().populate("todos");
        res.status(200).json(data); 
    }catch(err){
        res.status(500).json({
            message:'Something went wrong',
            error:err
        });
    }
});

module.exports=router;