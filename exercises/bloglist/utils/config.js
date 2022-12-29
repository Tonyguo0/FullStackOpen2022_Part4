require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
const PORT = process.env.PORT

module.exports = {
    mongoUrl,
    PORT
}