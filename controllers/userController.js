const User = require("../models/user")

const createUser = async (req, res) => {
  try {
    const { Username, PasswordHash, Email } = req.body
    const user = new User({ Username, PasswordHash, Email, Token: "null"})
    await user.save()
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const Token = req.get("Token")

    const user = await User.findOne({Token: Token})

    if(!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    if(user.ValidUntil < Date.now()) {
      return res.status(401).json({ error: 'Token expired' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

module.exports = { 
  createUser,
  getUser
}