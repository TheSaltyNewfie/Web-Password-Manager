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
            UserID: adminID,
            WebsiteName: 'LinkedIn',
            WebsiteURL: 'https://www.linkedin.com',
            Username: 'adminLinked',
            Password: 'linkedAdmin123'
        },
        {
            UserID: adminID,
            WebsiteName: 'Google',
            WebsiteURL: 'https://www.google.com',
            Username: 'adminGoogle',
            Password: 'googleAdmin456'
        },
        {
            UserID: adminID,
            WebsiteName: 'GitHub',
            WebsiteURL: 'https://www.github.com',
            Username: 'adminGit',
            Password: 'gitHubAdmin789'
        },
        {
            UserID: adminID,
            WebsiteName: 'YouTube',
            WebsiteURL: 'https://www.youtube.com',
            Username: 'adminTube',
            Password: 'youTubeAdmin012'
        },
        {
            UserID: adminID,
            WebsiteName: 'Reddit',
            WebsiteURL: 'https://www.reddit.com',
            Username: 'adminReddit',
            Password: 'redditAdmin345'
        },
        {
            UserID: adminID,
            WebsiteName: 'Pinterest',
            WebsiteURL: 'https://www.pinterest.com',
            Username: 'adminPins',
            Password: 'pinsAdmin678'
        },
        {
            UserID: adminID,
            WebsiteName: 'Tumblr',
            WebsiteURL: 'https://www.tumblr.com',
            Username: 'adminTumb',
            Password: 'tumblrAdmin901'
        },
        {
            UserID: adminID,
            WebsiteName: 'Snapchat',
            WebsiteURL: 'https://www.snapchat.com',
            Username: 'adminSnap',
            Password: 'snapAdmin234'
        },
        {
            UserID: adminID,
            WebsiteName: 'TikTok',
            WebsiteURL: 'https://www.tiktok.com',
            Username: 'adminTok',
            Password: 'tikTokAdmin567'
        },
        {
            UserID: adminID,
            WebsiteName: 'WhatsApp',
            WebsiteURL: 'https://www.whatsapp.com',
            Username: 'adminWhats',
            Password: 'whatsAppAdmin890'
        },
        {
            UserID: adminID,
            WebsiteName: 'Dropbox',
            WebsiteURL: 'https://www.dropbox.com',
            Username: 'adminDrop',
            Password: 'dropboxAdmin123'
        },
        {
            UserID: adminID,
            WebsiteName: 'Slack',
            WebsiteURL: 'https://www.slack.com',
            Username: 'adminSlack',
            Password: 'slackAdmin456'
        },
        {
            UserID: adminID,
            WebsiteName: 'Microsoft',
            WebsiteURL: 'https://www.microsoft.com',
            Username: 'adminMS',
            Password: 'microsoftAdmin789'
        },
        {
            UserID: adminID,
            WebsiteName: 'Amazon',
            WebsiteURL: 'https://www.amazon.com',
            Username: 'adminAmazon',
            Password: 'amazonAdmin012'
        },
        {
            UserID: adminID,
            WebsiteName: 'Apple',
            WebsiteURL: 'https://www.apple.com',
            Username: 'adminApple',
            Password: 'appleAdmin345'
        },
        {
            UserID: adminID,
            WebsiteName: 'Spotify',
            WebsiteURL: 'https://www.spotify.com',
            Username: 'adminSpotify',
            Password: 'spotifyAdmin678'
        },
        {
            UserID: adminID,
            WebsiteName: 'Netflix',
            WebsiteURL: 'https://www.netflix.com',
            Username: 'adminNetflix',
            Password: 'netflixAdmin901'
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