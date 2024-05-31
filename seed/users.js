const db = require('../db')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

if (!User) {
    console.error('User model is not defined.');
  } else {
    console.log('User model imported successfully.');
  }

const main = async () => {
  const users = [
    {
        Username: 'admin',
        PasswordHash: 'admin',
        Email: 'admin@thesaltynewfie.ca',
        Token: 'null'
    },
    {
        Username: 'JohnDoe',
        PasswordHash: 'password',
        Email: 'johndoe@gmail.com',
        Token: 'null'
    }
]
 
    await User.insertMany(users)
    console.log('Created Users!')
}

const run = async () => {
    await main()
    db.close()
}

run()