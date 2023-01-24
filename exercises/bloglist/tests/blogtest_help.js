const Blog = require('../models/bloglist')
const logger = require('../utils/logger')
bloginitiated = [
  {
    title: '10 things in JavaScript I love',
    author: 'Tony',
    url: 'https://www.digitalsurgeons.com/thoughts/technology/10-reasons-we-love-javascripts-es2015/',
    likes: '10',
  },
  {
    title: '10 things in JavaScript I hate',
    author: 'not Tony',
    url: 'https://www.getrevue.co/profile/masteringjs/issues/10-things-i-hate-about-javascript-284351',
    likes: '20',
  },
]

const BloginDB = async () => {
  const blogs = await Blog.find({})
  // const blogtojson = JSON.parse(blogs)
  const blogtojson = blogs.map((blog) => blog.toJSON())
  // logger.info(
  //   `BloginDB function found ${blogtojson} in Mongo type of blogs = ${typeof blogtojson}`
  // )
  return blogtojson
}

module.exports = {
  bloginitiated,
  BloginDB,
}
