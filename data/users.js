const User = require('mongoose').model('User')
const encryption = require('../utilities/encryption')

module.exports = {
  save: (user) => {
    User
      .findOne({ email: user.email })
      .then(user => {
        if (user) {
          console.log('ERROR: User already exists!')
          return
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
      })
  },
  findByEmail: (email) => {
    User.findOne({ email: email }).then(user => {
      console.log(user)
      return user
    })
  },
  findById: (id) => {
    User.findById(id).then(user => { return user })
  }
}
