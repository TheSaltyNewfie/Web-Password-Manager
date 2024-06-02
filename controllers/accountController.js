const Account = require('../models/account')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const getAccounts = async (req, res) => {
    try {
        const {Token} = req.body
        
        const user = await User.findOne({Token: Token})

        if(!user) {
            return res.status(401).json({ error: 'Invalid token' })
        }

        if(user.ValidUntil < Date.now()) {
            return res.status(401).json({ error: 'Token expired' })
        }

        const accounts = await Account.find({UserID: user._id})
        return res.status(200).json({ data: accounts })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAccounts
}