const router = require('express').Router();
const Message = require('../models/Message');
const multer  =require('multer')
const path1 = require('path')
const fs = require('fs')
const stream = require('stream')

router.get('/getChats',(req,res)=>{
    const {channel} = req.body;
    console.log(channel)
    Message.find()
        .exec((err,chats)=>{
            if(err) return res.status(400).json('could not load messages ');

            return res.status(200).json({
                chats
            })
        })
})


var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path1.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage }).single('file')


router.post('/upload',(req,res)=>{

    // res.send('hello')
    upload(req,res,(err)=>{
         if(err){
             return res.status(400).json({success:false,err})
         }
         return res.status(200).json({success:true,url:req.file.path})
        // console.log((req.file));
        // res.send('file')
    })

})

router.get('/uploads/:filename',(req,res)=>{
    const filename = req.params.filename;
    console.log(filename)
    const r = fs.createReadStream(`../server/uploads/${filename}`) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
     r,
     ps, // <---- this makes a trick with stream error handling
     (err) => {
      if (err) {
        console.log(err) // No such file or any other kind of error
        return res.sendStatus(400); 
      }
    })
    ps.pipe(res) // <---- this makes a trick with stream error handling
})

module.exports = router;