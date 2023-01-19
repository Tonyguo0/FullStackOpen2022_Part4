const Blog = require('../models/bloglist')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bloghelp = require('./blogtest_help')

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

afterAll(() => {
  mongoose.connection.close()
})
