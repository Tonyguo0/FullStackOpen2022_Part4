const User = require('../models/user');
const UsersRouter = require('express').Router()
const Logger = require('../utils/logger');
const bcrypt = require('bcrypt');

UsersRouter.get('/', async (req, res, next) => {
    returneduser = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1
    })

    res.json(returneduser).status(200).end()
})

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
    res.status(201).json(savedUser)
})



module.exports = UsersRouter