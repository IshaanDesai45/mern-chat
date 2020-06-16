const express   =  require('express')
const app       =  express()
const cors      = require('cors')
const mongoose  = require('mongoose')
const socketIo        = require('socket.io')
const loginRoute    = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute.js')
const chatRoute  = require('./routes/chatRoute')
const http = require('http')
const moment = require('moment')
const port  =5000;
const Message =     require('./models/Message')
const multer = require('multer')
//setting up socketIo server
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path')

//so that we don't need body parser
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
//connecting backend to the database
mongoose.connect("mongodb+srv://Ishaan:Ishaan1234@cluster0-bkgnb.mongodb.net/mern-chat?retryWrites=true&w=majority",{
    useNewUrlParser  : true,
    useCreateIndex   : true
})
    .then(res => console.log('Connected to db') )
    .catch(err => console.log(`could not connect to db Error : ${err.message}`))

io.on('connection',(socket)=>{
    console.log('new Client Connected')

    //on joinig
    socket.on('join',(activeChannel)=>{
        socket.join(activeChannel)
    })
    //for simple-input-message 
    socket.on('simple-input-message',({message,username,activeChannel,type})=>{
        const newMessage = new Message (
            {
                msg : message,
                username,
                date : Date.now(),
                type,
                channel : activeChannel
            }
        ) 
        newMessage.save()
            .then(message=>{
                const action = {type:'UPDATE',payload:message};
                console.log('going to update')
                io.to(activeChannel).emit('update',action)
            })
            .catch(err=>console.log(err))

    })


    //for disconnection
    socket.on("disconnect", () => console.log("Client disconnected"));
})

    

    
app.use('/login', loginRoute);
app.use('/register',registerRoute);
app.use('/',chatRoute)
//listening for request on port 5000




server.listen(port,()=>{
    console.log(`Server is running on Port : ${port}`)
})