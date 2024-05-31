const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema(
    {
        UserID: { type: Schema.Types.ObjectId, ref: 'UserID' },
        WebsiteName: { type: String, required: true },
        WebsiteURL: { type: String, required: true },
        Username: { type: String, required: true },
        Password: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('accounts', Account)