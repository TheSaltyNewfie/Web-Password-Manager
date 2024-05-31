const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        Username: { type: String, required: true },
        PasswordHash: { type: String, required: true },
        Email: { type: String, required: true },
        Token: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)