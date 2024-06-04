const User = require('../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const tokenGenerator = async (req, res) => {
    try {
        const { Username, Password } = req.body
        const user = await User.findOne({Username: Username, PasswordHash: Password})

        if(!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const length = 32
        const bytes = Math.ceil(length * 3 / 4);
        const token = crypto.randomBytes(bytes).toString('base64').slice(0, length).replace(/\+/g, '0').replace(/\//g, '0')
        const dategen = Date.now()
        const validUntil = Math.round(dategen + (10 * 60000))  // 10 minutes

        const testValue = (validUntil - Date.now()) / 60000

        const returnData = {
            token: token,
            date: dategen,
            validUntil: validUntil,
            minutes: testValue
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, {Token: token, ValidUntil: validUntil})

        return res.status(200).json({ token })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    tokenGenerator
}