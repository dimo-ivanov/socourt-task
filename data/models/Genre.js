const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: { type: [ObjectId], required: true, ref: 'Book' },
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() }
})

let Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre
