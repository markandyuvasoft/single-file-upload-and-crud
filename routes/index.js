import express from 'express'
import db from '../db/conn.js'
import User from '../models/user.js'
import multer from 'multer'

const indexrouter=express.Router()


// GET ROUTE START............................................................................

indexrouter.get("/get",async(req,res)=>{
    try{
        const get= await User.find()
    
        res.send(get)
       
        }catch(err){
    
            res.send(err)
        }
})
// GET ROUTE END............................................................................


// PUT ROUTE START.........................................................................
indexrouter.put("/user/:id", async (req,res)=>{

    try{
    
        const _id= req.params.id;
    
        const update= await User.findByIdAndUpdate(_id, req.body)
    
        res.send(update)
    
    }catch(err){
    
    res.status(400).send(err)
    }
    })
// PUT ROUTE END.........................................................................



// DELETE  START.....................................................................
indexrouter.delete("/user/:id",async (req,res)=>{

    try{

        const _id=req.params.id;

        const remove = await User.findOneAndRemove(_id,req.body)

        res.send(remove)
    }catch(err){
        res.status(400).send(err)
    }
})
// DELETE API  END............................................................................

//IMAGE UPLOAD API START......................................................................

// storage engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
}).single('profile')

 indexrouter.use('/profile', express.static('upload/images'));
indexrouter.post("/upload",(req, res) => {
    upload(req,res,(err)=>{

        if(err)
        {
            console.log(err);
        }
else{
    const data= new User({

        name:req.body.name,
        phone:req.body.phone,


        image:{
            data: req.file.filename,
            contentType:'image/png'
        }
    })

  data.save()
  .then(()=>res.json({
    success: 1,
        file_url: `http://localhost:3000/profile/${req.file.filename}`,
        data

        }))

    }   
      })

        })
//IMAGE UPLOAD API END......................................................................

export default indexrouter