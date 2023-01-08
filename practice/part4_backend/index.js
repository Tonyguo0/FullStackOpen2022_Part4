/**
 * REMEMBER TO ADD ENVIRONTMENT VAIRABLEES TO HEROKU
 * VIA:
 * DASHBOARD Or
 * heroku config:set MONGODB_URI='mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority'
 * heroku config:set PORT=''
 */

const app = require('./app')
const http = require('http')
const config = require('/utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})


