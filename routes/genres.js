const express = require('express')
const Genre = require('../data/models/Genre')
const Book = require('../data/models/Book')

const router = new express.Router()

router.get('/', (req, res) => {
  Genre
    .find()
    .then(genres => {
      if (!genres) {
        console.log('ERROR getting genres.')
        return
      }

      res.status(200).json(genres)
    })
})

router.get('/details/:id', (req, res) => {
  const id = req.params.id

  Genre
    .findById(id)
    .then(genre => {
      if (!genre) {
        return res.status(200).json({
          success: false,
          message: 'Genre does not exists!'
        })
      }

      res.status(200).json(genre)
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
      books = books.filter(book => book.genre.toLowerCase().includes(searchedString))
      res.status(200).json(books)
    })

  // Genre
  //   .find()
  //   .populate('books')
  //   .then(genres => {
  //     genres = genres.filter(genre => genre.name.toLowerCase().includes(searchedString))
  //     res.status(200).json(genres)
  //   })

  //   // .populate('books')
  //   // .then(books => {
  //   //   res.status(200).json(books)
  //   // })
})

module.exports = router
