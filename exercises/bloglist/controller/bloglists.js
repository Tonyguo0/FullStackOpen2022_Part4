const bloglistsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')
const logger = require('../utils/logger')


bloglistsRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  logger.info(`Blog ${bloglist} returned successfully`)
  response.json(bloglist)
})

bloglistsRouter.post('/', async (request, response) => {
  const body = request.body

  // find the exact user based on userid in the body of the request of the post
  const user = await User.findOne().sort({
    _id: -1
  })

  // create a new blog object that references this user's ID
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  // save the blog object created in to the database
  const savedBlog = await blog.save()
  // reference the savedblog and add the id into the blog in the user
  user.blogs = user.blogs.concat(savedBlog._id)
  // save this user with the blog info
  await user.save()
  logger.info(`Blog ${blog} added successfully`)
  response.status(201).json(savedBlog)
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
  const result = await Blog.findByIdAndUpdate(id, newBlog, {
    new: true
  })
  response.status(200).json(result)
})
module.exports = bloglistsRouter