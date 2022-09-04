const mongoose = require('mongoose')
// {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },

if (process.argv.length < 3) {
    console.log('Please provide password for the connection')
    return
} else if (process.argv.length === 4 || process.argv.length > 5) {
    console.log(
        'Please provide either just password or password and name and number'
    )
    return
}
const password = process.argv[2]
const url = `mongodb+srv://tgo:${password}@fullstackopen-tony.3qsjiry.mongodb.net/phonebook?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('person', phonebookSchema)

mongoose.connect(url)

if (process.argv.length === 3) {
    Phonebook.find({}).then((result) => {
        console.log('phonebook:')
        result.forEach((phonebook) => {
            console.log(`${phonebook.name} ${phonebook.number}`)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    console.log('processes:', process.argv[3], process.argv[4])
    let thisname = process.argv[3]
    let thisnumber = process.argv[4]
    console.log('processes:', thisnumber, typeof thisnumber)

    const phonebook = new Phonebook({
        name: thisname,
        number: thisnumber,
    })

    phonebook.save().then(() => {
        console.log(`added ${thisname} number ${thisnumber} to phonebook`)
        mongoose.connection.close()
    })
}
