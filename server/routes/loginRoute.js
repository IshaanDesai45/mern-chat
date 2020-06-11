const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken')
const User   = require('../models/User')
const auth   = require('../middleware/auth')
router.post('/',(req,res)=>{
    const  {email,password} = req.body;

    //Simple check 
    if(!email || !password)
        return res.status(400).json('Enter all the values')

    User.findOne({email})
        .then(user => {

            if(!user) return res.status(400).json('it seems you havent registered')

            bcrypt.compare(password,user.password)
                .then(isMatch => {
                    if(!isMatch) res.status(400).json('worng password')

                    jwt.sign(
                        {id : user.id},
                        'mern-chat',
                        {expiresIn:'3 hours'},
                        (err,token)=>{
                            if(err) throw err;
                            return res.json({
                                token,
                                user : {
                                    id : user.id,
                                    username : user.username,
                                    email : user.email
                                }
                            })
                        })
                        
                })

        })
})

router.get('/user',auth,(req,res)=>{
    
    User.findById(req.user.id)
        .select('-password')
        .then(user => {return res.json(user) })
})

module.exports = router