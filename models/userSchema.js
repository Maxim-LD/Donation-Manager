
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, lowercase: true },
    password: {type: String, require: true},
    role: {type: String, require: true},
    uniqueId: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
})

const Users = new mongoose.model("users", userSchema)

module.exports = Users