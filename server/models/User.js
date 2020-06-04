const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type:String,required:true,maxlength:50},
    email    : {type:String,required:true,unique:1,trim:true},
    password : {type:String,required:true,minlength:5},
    registerDate : {type:Date,default : Date.now}
},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User