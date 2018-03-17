const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const localSignupStrategy = require('../passport/local-signup')
const localLoginStrategy = require('../passport/local-login')

module.exports = (app) => {
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(session({
    secret: 'neshto-taino!@@!%-',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cors())

  passport.use('local-signup', localSignupStrategy)
  passport.use('local-login', localLoginStrategy)

  console.log('Express ready!')
}
