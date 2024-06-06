const Account = require('../models/account')
const User = require('../models/user')

const getAccounts = async (req, res) => {
    try {
        const Token = req.get('Token')
        
        const user = await User.findOne({Token: Token})

        if(!user) {
            return res.status(401).json({ error: 'Invalid token' })
        }

        if(user.ValidUntil < Date.now()) {
            return res.status(401).json({ error: 'Token expired' })
        }

        const accounts = await Account.find({UserID: user._id})
        return res.status(200).json({ accounts })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const addAccount = async (req, res) => {
    try {
        const {Token, WebsiteName, WebsiteURL, Username, Password} = req.body

        const user = await User.findOne({Token: Token})

        if(!user) {
            return res.status(401).json({ error: 'Invalid token' })
        }

        if(user.ValidUntil < Date.now()) {
            return res.status(401).json({ error: 'Token expired' })
        }

        const account = new Account({UserID: user._id, WebsiteName, WebsiteURL, Username, Password})
        await account.save()
        return res.status(201).json({ account })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteAccount = async (req, res) => {
    try {
        const Token = req.get('Token')
        const _id = req.params.id

        console.log(`Token: ${Token}\n_id: ${_id}`)

        const user = await User.findOne({Token: Token})

        if(!user) {
            console.log(user)

            return res.status(401).json({ error: 'Invalid token' })
        }

        if(user.ValidUntil < Date.now()) {
            return res.status(401).json({ error: 'Token expired' })
        }

        const account = await Account.findByIdAndDelete(_id)

        return res.status(200).json({ account })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateAccount = async (req, res) => {
    try {
        const {Token, _id, WebsiteName, WebsiteURL, Username, Password} = req.body

        const user = await User.findOne({Token: Token})

        if(!user) {
            return res.status(401).json({ error: 'Invalid token' })
        }

        if(user.ValidUntil < Date.now()) {
            return res.status(401).json({ error: 'Token expired' })
        }

        const account = await Account.findByIdAndUpdate(_id, {WebsiteName, WebsiteURL, Username, Password})

        return res.status(200).json({ account })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAccounts,
    addAccount,
    deleteAccount,
    updateAccount
}