const router = require('express').Router();
const Message = require('../models/Message');


router.get('/',(req,res)=>{
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


module.exports = router;