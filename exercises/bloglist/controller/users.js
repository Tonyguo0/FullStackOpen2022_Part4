const User = require('../models/user');
const UsersRouter = require(express).Router()
const Logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const {
    response
} = require('../app');

UsersRouter.post('/', async (req, res) => {

    const {
        username,
        name,
        password
    } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = UsersRouter