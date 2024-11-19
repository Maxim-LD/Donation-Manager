
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    designation: {type: String, require: true},
    uniqueId: { type: String, default: null }
}, {
    timestamps: true
})

const Users = new mongoose.model("users", userSchema)

module.exports = Users