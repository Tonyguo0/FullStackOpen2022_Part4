const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MONGODB!')
    })
    .catch((err) => {
        console.log(`connection to mongoDB failed because of error: ${err}`)
    })

const phonebookSchema = new mongoose.Schema({
    name: { type: String, minLength: 3 },
    number: {
        type: String,
        validate: {
            validator: (i) => {
                if (i.includes('-')) return /^((\d{3}|\d{2})-\d+)$/.test(i)
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        minLength: 8,
    },
})

// phonebookSchema.virtual("id").get(() => {
//   return this._id.toString();
// });
// get rid of _id and __v field and virtuals enabled automatically serialises the _id to be a id key and string value
phonebookSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, converted) => {
        delete converted._id
    },
})

module.exports = mongoose.model('person', phonebookSchema)
