const mongoose = require('mongoose')

const Schema  =  mongoose.Schema ;

const messagesSchema = new Schema({
   msg : {type:String,trim:true,required:true},
   date:  {type:Date,required:true,default:Date.now},
   user: { 
      type: Schema.Types.ObjectId,
      ref: 'User' 
   },
   channel: {type:String,required:true},
   type : {type:String,required:true}
},{timestamps:true});


const Messages = mongoose.model("Messages",messagesSchema)

module.exports = Messages