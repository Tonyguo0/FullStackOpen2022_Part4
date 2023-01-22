const bloglistsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const logger = require('../utils/logger')

bloglistsRouter.get('/', async(request, response) => {
  const bloglist = await Blog.find({})
  logger.info(`Blog ${bloglist} returned successfully`)
  response.json(bloglist)
})

bloglistsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  logger.info(`Blog ${blog} added successfully`)
  response.status(201).json(result)
  
})

module.exports = bloglistsRouter
