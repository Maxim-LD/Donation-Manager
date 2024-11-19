 
const express = require('express')
const mongoose = require('mongoose')
const dbConnection = require('./utilities/db')
const dotenv = require('dotenv').config()
const userRoute = require('./routes/userRoute')


const app = express() 
app.use(express.json())


const PORT = process.env.PORT || 8002

// a port for local testing -- listens for the port being called
app.listen(PORT, ()=>{
    console.log(`Connected via port ${PORT}`)
})

dbConnection()

//response handler --- for website requests (the homepage route)
app.get("/", (req, res)=>{

    return res.status(200).json({
        message: "Welcome to Max Foundation Donation Platform!"
    })
})

app.use("/api", userRoute)


app.use((req, res)=>{
    res.status(404).json({message: "This endpoint does not exist yet!"})
})


  

