const router  = require('express').Router();
const User    = require('../models/User')
const bcrypt  = require('bcrypt')
const jwt  = require('jsonwebtoken')

// const router = require('express').Router();
// const Admin = require('../models/admin.model')
// const bcrypt = require('bcrypt')
// const config = require('config')


router.get('/',(req,res)=>{
    res.send('hello')
})


router.route('/').post((req,res)=>{
    const {username,email,password} = req.body;

    //Simple Validation 
    if(!username || !email || !password){
        return res.status(400).json({msg : 'pls enter all the values'})

    }

    User.findOne({email})
        .then(user =>{
            if(user) return res.status(400).json({msg :'email is alredyy in use'})

            const newUser =  new User ({
                username,
                email,
                password
            })

            //hashing the password
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password, salt,(err,hash)=>{
                    if (err) throw err;

                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                {id : user.id},
                                'mern-chat',
                                {expiresIn: "3 hours"},
                                (err,token) =>{
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user :{
                                            id :user.id,
                                            username:user.username,
                                            email:user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
})

module.exports = router


