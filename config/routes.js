const authRoutes = require('../routes/auth')
const booksRoutes = require('../routes/books')
const genresRoutes = require('../routes/genres')

module.exports = (app) => {
  app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' })
  })

  app.use('/auth', authRoutes)
  app.use('/api/books', booksRoutes)
  app.use('/api/genres', genresRoutes)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
