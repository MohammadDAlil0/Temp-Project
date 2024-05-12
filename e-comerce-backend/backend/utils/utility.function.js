const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkPassword = (password, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        reject(err)
      }

      resolve(same)
    })
  })
}

const newToken = user => {
  return jwt.sign({id: user._id}, '12345-67890-09876-54321', {
    expiresIn: '100d',
  })
}

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, '12345-67890-09876-54321', (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

module.exports = {checkPassword, newToken, verifyToken}
