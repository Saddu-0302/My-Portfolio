const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    textarea: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)