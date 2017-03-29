var redis = require('redis')
var passwordHash = require('password-hash')
var client


function connect() {
  client = redis.createClient()

  client.on("error", (err) => {
    console.log("Error: "+ err)
  })
}

function storeUser(username, password, callback) {
  // check if this username is already taken
  client.get(username, (err, reply) => {
    if (err) {
      console.error(err)
      return callback(err.message)
    }
    if (reply == null) {
      // Save this as a new user
      var hashedPassword = passwordHash.generate(password)
      client.set(username, hashedPassword)
      return callback()
    }
    else {
      // Otherwise, this username is taken
      return callback("Username is already in use")
    }
  })
}

function verifyUser(username, password, callback) {
  client.get(username, (err, hashedPassword) => {
    if (err) {
      console.error(err)
      return callback(err.message)
    }
    if (hashedPassword == null) {
      return callback("No user with that username")
    }
    if ( passwordHash.verify(password, hashedPassword) ) {
      return callback()
    }
    else {
      return callback('invalid email and password')
    }
  })
}

module.exports.connect = connect
module.exports.storeUser = storeUser
module.exports.verifyUser = verifyUser
