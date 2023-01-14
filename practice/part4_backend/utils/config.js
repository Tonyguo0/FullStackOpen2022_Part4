require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI_NOTE
    : process.env.MONGODB_URI_NOTE

module.exports = {
  MONGODB_URI,
  PORT,
}
