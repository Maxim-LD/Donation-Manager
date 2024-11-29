const mongoose = require('mongoose')


const dbConnection = async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch((error)=> {
        console.log(error)
    })
}

module.exports = dbConnection