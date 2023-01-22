const bloglistsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const logger = require('../utils/logger')

bloglistsRouter.get('/', async(request, response) => {
  const bloglist = await Blog.find({})
  logger.info(`Blog ${bloglist} returned successfully`)
  response.json(bloglist)
})

bloglistsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
    logger.info(`Blog ${blog} added successfully`)
  })
})

module.exports = bloglistsRouter
