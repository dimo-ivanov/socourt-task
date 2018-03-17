const Book = require('./models/Book')
const Genre = require('./models/Genre')

module.exports = {
  save: (book) => {
    Book
      .create({
        name: book.name,
        author: book.author,
        genre: book.genre,
        updatedOn: { type: Date, default: Date.now() }
      })
      .then(book => {
        if (!book) {
          console.log('ERROR while saving the new book.')
          return
        }

        Genre
          .findOne({ name: book.genre })
          .then(genre => {
            if (genre) {
              genre.books.push(book._id)
              genre.updatedOn = Date.now()
              Genre.findByIdAndUpdate(genre._id, genre)
              return
            }

            Genre
              .create({
                name: book.genre,
                books: [book._id]
              })
          })
      })
  },
  all: () => {
    Book.find().then(books => {
      return books
    })
  },
  findById: (id) => {
    Book.findById(id).then(book => {
      return book
    })
  },
  findByGenre: (genre) => {
    Book.find({ genre: genre }).then(books => {
      return books
    })
  }
}
