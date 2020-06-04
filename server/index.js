const express =  require('express')
const app     =  express()
const cors  = require('cors')
const mongoose  = require('mongoose')
const port  =5000;

//so that we don't need body parser
app.use(cors());
app.use(express.json());

//connecting backend to the database
mongoose.connect("mongodb+srv://Ishaan:Ishaan1234@cluster0-bkgnb.mongodb.net/mern-chat?retryWrites=true&w=majority",{
    useNewUrlParser  : true,
    useCreateIndex   : true
})
    .then(res => console.log('Connected to db') )
    .catch(err => console.log(`could not connect to db Error : ${err.message}`))



    app.get('/',(req,res)=>{
        res.send('hello')
    })

    const loginRoute    = require('./routes/loginRoute')
    const registerRoute = require('./routes/registerRoute.js')
    app.use('/login', loginRoute);
    // app.use('/users', usersRouter);
    app.use('/register',registerRoute);
    // app.use('/auth',auth)

//listening for request on port 5000
app.listen(port,()=>{
    console.log(`Server is running on Port : ${port}`)
})