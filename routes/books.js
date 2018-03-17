const express = require('express')
const Book = require('../data/models/Book')
const Genre = require('../data/models/Genre')
const authCheck = require('../middleware/auth-check')

const router = new express.Router()

function validateBookForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.name !== 'string' || payload.name < 1) {
    isFormValid = false
    errors.name = 'Name must be more than 1 symbol.'
  }

  if (!payload || typeof payload.genre !== 'string' || payload.genre < 3) {
    isFormValid = false
    errors.genre = 'Genre must be more than 3 symbols.'
  }

  if (!payload || typeof payload.author !== 'string' || payload.author < 3) {
    isFormValid = false
    errors.author = 'Author must be more than 3 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const book = req.body

  const validationResult = validateBookForm(book)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Book
    .create({
      name: book.name,
      author: book.author,
      genre: book.genre
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

  res.status(200).json({
    success: true,
    message: 'Book added successfuly.',
    book
  })
})

router.get('/', (req, res) => {
  Book
    .find()
    .then(books => {
      if (!books) {
        console.log('ERROR getting books.')
        return
      }

      res.status(200).json(books)
    })
})

router.get('/details/:id', (req, res) => {
  const id = req.params.id

  Book
    .findById(id)
    .then(book => {
      if (!book) {
        return res.status(200).json({
          success: false,
          message: 'Book does not exists!'
        })
      }

      res.status(200).json(book)
    })
    .catch(err => {
      return res.status(200).json({
        success: false,
        message: err.message
      })
    })
})

router.post('/search', (req, res) => {
  const searchedString = req.body.search.toLowerCase()

  Book
    .find()
    .then(books => {
      books = books.filter(book => book.name.toLowerCase().includes(searchedString))
      res.status(200).json(books)
    })
})

module.exports = router
