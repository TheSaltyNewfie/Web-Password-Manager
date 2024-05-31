const User = require('../models/user')
const bcrypt = require('bcrypt')

const authenticate = async (req, res) => {
    try {
        const { Username, PasswordHash } = req.body
        const user = await User.findOne({Username: Username, PasswordHash: PasswordHash})
        console.log(user)
        return res.status(200).json({ data: user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const tokenGenerator = async (req, res) => {
    try {
        const { Username, PasswordHash } = req.body
        const user = await User.findOne({Username: Username, PasswordHash: PasswordHash})
        const token = await bcrypt.hash(user._id.toString() + "_" + Date.now, 10)
        const dategen = Date.now().toString()

        const returnData = {
            token: token,
            date: dategen
        }

        return res.status(200).json({ data: returnData })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    authenticate,
    tokenGenerator
}