// exports the router to be available for all consumers of the module
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/helloworld', (request, response) => {
  response.send('<h1>Hello world!!!</h1>')
})

notesRouter.get('/', async (request, response) => {
  const note = await Note.find({})
  response.json(note)
})

notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.delete('/', (request, response, next) => {
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

notesRouter.put('/:id', (request, response, next) => {
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

notesRouter.post('/', async (request, response, next) => {
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

  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

module.exports = notesRouter
