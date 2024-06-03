const User = require('../models/user')

const CreateUser = async (req, res) => {
    try {
        const { Username, PasswordHash } = req.body
        const user = new User({Username, PasswordHash})
        await user.save()
        return res.status(201).json({ data: user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}