const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tgo:${password}@fullstackopen-tony.3qsjiry.mongodb.net/noteApp?retryWrites=true&w=majority`
// const url = `mongodb://tgo:${password}@ac-qcn4pfb-shard-00-00.3qsjiry.mongodb.net:27017,ac-qcn4pfb-shard-00-01.3qsjiry.mongodb.net:27017,ac-qcn4pfb-shard-00-02.3qsjiry.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-l55oxn-shard-0&authSource=admin&retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// common syntax
// mongoose.connect(url);

// Note.find({ important: {$in:false}}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });

//   mongoose.connection.close()
// });

// promise chaining
mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    // const note = new Note({
    //   content: 'HTML is Easy',
    //   date: new Date(),
    //   important: true,
    // })

    // return note.save()
    // console.log("Note.find = \n",Note.find({}));
    return Note.find({ important: { $in: true } })
  })
  .then((result) => {
    // console.log("\n\n\n\n Result = \n",result);
    result.forEach((note) => {
      console.log(note)
    })
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
