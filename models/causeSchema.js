const mongoose = require('mongoose')

const causeSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    goalAmount: {type: Number, required: true},    
    raisedAmount: {type: Number, required: true},
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true },
    createdAt: { type: Date, default: Date.now }    
})

const Causes = new mongoose.model("cause", causeSchema)

module.exports = Causes
