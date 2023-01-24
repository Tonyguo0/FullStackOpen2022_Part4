const Blog = require('../models/bloglist')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bloghelp = require('./blogtest_help')
const logger = require('../utils/logger')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blog1 = new Blog(bloghelp.bloginitiated[0])
  await blog1.save()
  const blog2 = new Blog(bloghelp.bloginitiated[1])
  await blog2.save()
})

test('json is returned as content', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('GET the correct amount of blog posts returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(bloghelp.bloginitiated.length)
})

test('the property of the blogposts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('POST creates a new blog post successfully', async () => {
  const newBlog = {
    title: 'Top 10 reasons why you should learn React right now',
    author: 'Mohammad Ayubo',
    url: 'https://medium.com/@SilentHackz/top-10-reasons-why-you-should-learn-react-right-now-f7b0add7ec0d',
    likes: '110',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(bloghelp.bloginitiated.length + 1)
  const blog_title = response.body.map((b) => b.title)
  expect(blog_title).toContain(
    'Top 10 reasons why you should learn React right now'
  )
})

test.only('DELETE deletes a blog successfully', async () => {
  const BlogAtStart = await bloghelp.BloginDB()
  const BlogtoDelete = BlogAtStart[1]

  await api.delete(`/api/blogs/${BlogtoDelete.id}`).expect(204)

  const BlogsAfterDelete = await bloghelp.BloginDB()
  expect(BlogsAfterDelete).toHaveLength(bloghelp.bloginitiated.length - 1)

  const blogtitle = BlogsAfterDelete.map((b) => b.title)
  expect(blogtitle).not.toContain(BlogtoDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})
