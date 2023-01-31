// exports the router to be available for all consumers of the module
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/helloworld', (request, response) => {
  response.send('<h1>Hello world!!!</h1>')
})

notesRouter.get('/', async (request, response) => {
  const note = await Note.find({})
  response.json(note)
})

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const note = await Note.findById(id)

  if (note) {
    response.json(note)
  } else {
    response.statusMessage = `resource note with id ${id} can't be found`
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const note = await Note.findByIdAndRemove(id)

  response.status(204).json(note)
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

notesRouter.post('/', async (request, response) => {
  // request.body has the supposed new json request object note that needs to be added using post
  const body = request.body

  const user = await User.findById(body.userId)

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote)
})

module.exports = notesRouter
