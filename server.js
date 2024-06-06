const express = require('express')
const db = require('./db')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const loginController = require('./controllers/loginController')
const accountController = require('./controllers/accountController')
const userController = require('./controllers/userController')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running!')
})

app.post('/token', loginController.tokenGenerator)

app.get('/accounts', accountController.getAccounts)
app.post('/accounts', accountController.addAccount)
app.put('/accounts', accountController.updateAccount)
app.delete('/accounts/:id', accountController.deleteAccount)

app.get('/users', userController.getUser)
app.post('/users', userController.createUser)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})