const mongoose = require('mongoose')


const dbConnection = async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("Connected to Database")
    })
}

module.exports = dbConnection