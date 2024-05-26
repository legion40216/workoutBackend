require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workoutRoutes')

const app = express()
const mongoose = require('mongoose')

//middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//route
app.use('/api/workouts', workoutRoutes)

//connect to db 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Connect to db and listining 4000!!")
    })
})
.catch((err)=>{
console.log(err)
})

