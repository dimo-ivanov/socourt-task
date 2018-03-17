const PassportLocalStrategy = require('passport-local').Strategy
const User = require('mongoose').model('User')
const encryption = require('../utilities/encryption')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const user = {
    email: email.trim(),
    password: password.trim()
  }

  User
    .findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        return done('E-mail already exists!')
      }

      let salt = encryption.generateSalt()
      let hashedPass = encryption.generateHashedPassword(salt, user.password)

      User
        .create({
          email: user.email,
          salt: salt,
          hashedPass: hashedPass,
          roles: []
        })

      return done(null)
    })
})
