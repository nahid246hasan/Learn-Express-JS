/*
file upload er jonno amader multipart use korte hoy form data er modhe.
I mean front end theke data multipart/form-data hishebe ashe.
amra etodin express.json diye body parser er madhome json data niye kaj korechi. but 
kono file niye kaj kori ni
ei file e amra file kivabe fronend theke eshe backend e handle korte hoy dekhbo.     


ei khetre amra multer package ta use korbo




1) add multer package to your project: npm i multer
2) require multer package to your project: const multer = require('multer');
3) create multer object: const upload = multer();
   multer er modhe amader kichu parameter dite hoy.
   multer({
       dest: 'uploads/',                    ekhane folder er name hobe jekhane file rakhte chai
       limit: {
            fileSize: 1000000,              ekhane file er size limit dewa jay       
       },

       fileFilter diye amra filter kortechi amra actually kon type er file chai. image naki video egulo separate korte parbo.

       fileFilter: (req, file, cb) => {                                                 
           if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
               cb(null, true);
           } else {
               cb(null, false);
           }
       }
   })


4) chaile amra ekta function e onek gula middleware use korte pari
5) single file upload er jonno upload.single('file'), multiple file upload er jonno upload.array('file', 5) *****************************************
6) JODI AMON  hoy onek gula field ache . 
upload.fields([
    {name:'file', maxCount: 5}, 
    {name:'cover', maxCount: 1}
])

*/



const express= require('express');
const multer= require('multer');
const path= require('path');

//define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        /* 
        at first we will take the file name and take control over the file name. as example of name : My File.png
        now we will take the name and extension and take control over the name and extension. as example of name : My File and extension : png
        My File take alada kore shob choto hater korbo. then my er pore space take _ score diye replace korbo. and finally last e unique kichu dibo.
        after doing all the task i will add the extension with the final name.          

        */

        //so at first for taking extension i have to take path module.

         //ekhane file.originalname means amader file er original name. and path.extname amader original name theke extension alada korbe.
        const fileExt= path.extname(file.originalname);

        //now  i will make the final name without extension.
        //ekhane first e original file name theke fileExt null er shathe replace kora hoyeche.
        //then baki shob kichuke lowercase e kora hoyeche. then space seperate e split kora hoyeche.
        //then again we join all the space seperated part with - and finally Date.now e add kora hoyeche.
        const fileName= file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-')+'-'+Date.now();

        //finally i added the extension with the final name.
        cb(null, fileName+fileExt);

        // then finall we go to the upload folder. and we don't need to say destination to the upload =multer({}) function.
    }
});

const upload = multer({
    //we don't need to mention destination. Because we have defined it in the storage.
    //dest: './uploads/',

    storage: storage,
    limit: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        if(file.fieldname === 'file'){
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                cb(null, true);
            } else {
                cb(new Error("only .jpeg and .png files are allowed"), false);
            }
        }
        else if(file.fieldname === 'cover'){
            if(file.mimetype === 'application/pdf'){
                cb(null, true);
            } else {
                cb(new Error("only .pdf files are allowed"), false);
            }
        }
        
    }
});

const app= express();

app.post('/',upload.single('file'),(req,res)=>{
    res.send('Hello World');
});

app.post('/any',upload.fields([
    {name:'file', maxCount: 5}, 
    {name:'cover', maxCount: 1}
]),(req,res)=>{
    console.log(req.body);
    console.log(req.files);//req.files will provide us the file information.(like image and pdf)
    res.send('Hello World');
});

//default error handle
app.use((err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        res.status(400).send('File too large');
    } else {
        next();
    }
})

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});