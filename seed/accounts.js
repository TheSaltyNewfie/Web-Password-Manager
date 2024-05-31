const db = require('../db')
const Account = require('../models/account')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const Admin = await User.find({ Username: 'admin' })
    const JohnDoe = await User.find({ Username: 'JohnDoe' })
    const adminID = Admin[0]._id
    const johnDoeID = JohnDoe[0]._id

    const accounts = [
        {
            UserID: adminID,
            WebsiteName: 'Facebook',
            WebsiteURL: 'https://www.facebook.com',
            Username: 'admin',
            Password: 'admin'
        },
        {
            UserID: adminID,
            WebsiteName: 'Twitter',
            WebsiteURL: 'https://www.twitter.com',
            Username: 'admin',
            Password: 'admin'
        },
        {
            UserID: adminID,
            WebsiteName: 'Instagram',
            WebsiteURL: 'https://www.instagram.com',
            Username: 'admin',
            Password: 'admin'
        },
        {
            UserID: johnDoeID,
            WebsiteName: 'Facebook',
            WebsiteURL: 'https://www.facebook.com',
            Username: 'JohnDoe113',
            Password: 'password12314'
        },
        {
            UserID: johnDoeID,
            WebsiteName: 'Twitter',
            WebsiteURL: 'https://www.twitter.com',
            Username: 'JohnDoe',
            Password: 'p4ssw0rd'
        },
        {
            UserID: johnDoeID,
            WebsiteName: 'Instagram',
            WebsiteURL: 'https://www.instagram.com',
            Username: 'JohnDoe',
            Password: 'd0rwss4p'
        
        }
]
 
    await Account.insertMany(accounts)
    console.log('Created Accounts!')
}

const run = async () => {
    await main()
    db.close()
}

run()