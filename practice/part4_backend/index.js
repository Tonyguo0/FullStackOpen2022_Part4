/**
 * REMEMBER TO ADD ENVIRONTMENT VAIRABLEES TO HEROKU
 * VIA:
 * DASHBOARD Or
 * heroku config:set MONGODB_URI='mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority'
 * heroku config:set PORT=''
 */

require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/note')

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello world!!!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  console.log(id)
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.statusMessage = `resource note with id ${id} can't be found`
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndRemove(id)
    .then((result) => {
      if (result) response.status(204).end()
      else {
        response
          .status(404)
          .send({ error: `resource note with id ${id} can't be found` })
      }
    })
    .catch((error) => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
  }
  console.log(request.params.id)
  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      console.log(updatedNote)
      response.json(updatedNote)
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/notes', (request, response, next) => {
  // request.body has the supposed new json request object note that needs to be added using post
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((err) => {
      next(err)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error)
  // console.log(error.name);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
