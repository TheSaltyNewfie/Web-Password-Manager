const express = require('express')
const db = require('./db')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const loginController = require('./controllers/loginController')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running!')
})

app.post('/login', loginController.authenticate)
app.post('/token', loginController.tokenGenerator)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})