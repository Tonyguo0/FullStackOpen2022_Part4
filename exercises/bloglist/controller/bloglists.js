const bloglistsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const logger = require('../utils/logger')

bloglistsRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({})
  logger.info(`Blog ${bloglist} returned successfully`)
  response.json(bloglist)
})

bloglistsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  logger.info(`Blog ${blog} added successfully`)
  response.status(201).json(result)
})

bloglistsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndRemove(id)
  logger.info(`Blog ${result} deleted successfully`)

  response.status(204).end()
})

bloglistsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const result = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
  response.status(200).json(result)
})
module.exports = bloglistsRouter
