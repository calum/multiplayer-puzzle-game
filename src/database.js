var mysql = require('mysql')
var passwordHash = require('password-hash')
var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || 'localhost',
  user: process.env.RDS_DB_USERNAME || 'root',
  password: process.env.RDS_PASSWORD || 'secret',
  database: process.env.RDS_NAME || 'test'
})

var sqlSelect = 'SELECT * FROM ?? WHERE ?? = ?'
var sqlInsert = 'INSERT INTO users SET ?'

function connect(callback) {
  // connect to the mysql database
  connection.connect( (err) => {
    if (err) {
      return callback(err)
    }
    // create the databaser for user passwords
    var userTable = connection.query('CREATE TABLE IF NOT EXISTS users (name VARCHAR(20), password VARCHAR(500))')
    userTable
      .on('error', (err) => {
        winston.error(err)
        return callback(err)
      })
      .on('done', () => {
        return callback()
      })

  })
}

function storeUser(username, password, callback) {
  var inserts = ['users', 'name', username]
  // format the sql query
  var query = mysql.format(sqlSelect, inserts)

  // check if this username is already taken
  connection.query(query, (err, results) => {
    if (err) {
      winston.error(err)
      return callback(err.message)
    }

    // Save this as a new user if the username hasn't been taken
    if (results.length == 0) {
      // generate hashed password
      var hashedPassword = passwordHash.generate(password)

      connection.query(sqlInsert, {name: username, password: hashedPassword}, function(err, results, fields) {
        if (err) {
          winston.error(err)
          return callback(err.message)
        }
        return callback()
      })
    }
    else {
      // Otherwise, this username is taken
      return callback("Username is already in use")
    }
  })
}

function verifyUser(username, password, callback) {
  // create the query:
  var inserts = ['users', 'name', username]
  // format the sql query
  var query = mysql.format(sqlSelect, inserts)

  connection.query(query, (err, results) => {
    if (err) {
      winston.error(err)
      return callback(err.message)
    }
    if (results.length == 0) {
      return callback("No user with that username")
    }
    // verify the password
    if ( passwordHash.verify(password, results[0].password) ) {
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
