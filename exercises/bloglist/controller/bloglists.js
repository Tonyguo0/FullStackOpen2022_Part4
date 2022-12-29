const bloglistsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const logger = require('../utils/logger')

bloglistsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
    logger.info(`Blog ${blogs} returned successfully`)
  })
})

bloglistsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
    logger.info(`Blog ${blog} added successfully`)
  })
})

module.exports = bloglistsRouter
