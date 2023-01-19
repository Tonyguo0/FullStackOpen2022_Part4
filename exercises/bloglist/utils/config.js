require('dotenv').config()

const mongoUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI_BLOG
    : process.env.MONGODB_URI_BLOG
    
const PORT = process.env.PORT

module.exports = {
  mongoUrl,
  PORT,
}
