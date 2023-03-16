const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const {
        username,
        password
    } = req.body

    // find a user in the database that has the same username
    const user = await User.findOne({
        username
    })

    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    // if user is Null or password isn't correct return 401 error code 
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    // create the usertoken to be signed into a jwt payload with the signature being any secret that was given
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter