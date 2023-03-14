const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const BloglistsRouter = require('./controller/bloglists')
const UsersRouter = require('./controller/users')
const requestLogger = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')



logger.info('connecting to MongoURL')

mongoose.connect(config.mongoUrl).then(()=>{
    logger.info('connected to MongoDB')
}).catch((err)=>{
    logger.error('error in connecting to MongoDB', err.message)
})

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', BloglistsRouter)
app.use('/api/users', UsersRouter)

module.exports = app