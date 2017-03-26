var redis = require('redis')
var passwordHash = require('password-hash')
var client


function connect() {
  client = redis.createClient()

  client.on("error", (err) => {
    console.log("Error: "+ err)
  })
}

function storeUser(username, password) {
  // check if this username is already taken
  client.get(username, (err, reply) => {
    if (err) {
      return err
    }
    if (reply == null) {
      // Save this as a new user
      var hashedPassword = passwordHash.generate(password)
      client.set(username, hashedPassword)
    }
    else {
      // Otherwise, this username is taken
      return new Error("Username is already in use")
    }
  })
}

function verifyUser(username, password) {
  client.get(username, (err, hashedPassword) => {
    if (err) {
      return err
    }
    if (hashedPassword == null) {
      return new Error("No user with that username")
    }
    return passwordHash.verify(password, hashedPassword)
  })
}

module.exports.connect = connect
module.exports.storeUser = storeUser
module.exports.verifyUser = verifyUser
