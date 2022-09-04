const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// NO PASSWORD SAVED SO NOT WORKING
// const url = `mongodb+srv://tgo:{password}@fullstackopen-tony.3qsjiry.mongodb.net/noteApp?retryWrites=true&w=majority`;
const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB:', err.message)
  })

const noteSchema = new mongoose.Schema({
  content: { type: String, minLength: 5, required: true },
  date: { type: Date, required: true },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
