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


// const express = require('express')
// const app = express()


// const cors = require('cors')

// const Note = require('./models/note')

// const requestLogger = (request, response, next) => {
//   console.log('Method: ', request.method)
//   console.log('Path: ', request.path)
//   console.log('Body: ', request.body)
//   console.log('---')
//   next()
// }

// app.use(cors())
// app.use(express.static('build'))
// app.use(express.json())
// app.use(requestLogger)

// // handler of requests with result to errors
// app.use(errorHandler)


// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// // handler of requests with unknown endpoint
// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
//   console.error(error)
//   // console.log(error.name);
//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }


