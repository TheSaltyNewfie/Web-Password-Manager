const mongoose = require('mongoose')

mongoose
  .connect('mongodb://192.168.4.127:27017/passwordDatabase')
  .then(() => {
    console.log('Successfully connected to MongoDB.')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })
    
mongoose.set('debug', true)

const db = mongoose.connection

module.exports = db