const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://admin:admin@ds215759.mlab.com:15759/socourt_task',
    port: 5000
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
}
