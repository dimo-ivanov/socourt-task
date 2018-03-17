const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  genre: { type: String, ref: 'Genre' },
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() }
})

let Book = mongoose.model('Book', bookSchema)

module.exports = Book
