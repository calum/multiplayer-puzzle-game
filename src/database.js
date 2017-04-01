var mysql = require('mysql')
var passwordHash = require('password-hash')
var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME   || 'localhost',
  user     : process.env.RDS_USERNAME   || 'root',
  password : process.env.RDS_PASSWORD   || 'secret',
  port     : process.env.RDS_PORT       || '3306',
  database : process.env.RDS_DB_NAME    || 'test'
})

var winston = require('winston')

// pre-made quieries for the users table
var sqlSelect = 'SELECT * FROM ?? WHERE ?? = ?'
var sqlInsert = 'INSERT INTO users SET ?'

// pre-made queries for the game table
var gameInsert = 'INSERT INTO game SET ?'
var gameSelect = 'SELECT * FROM game WHERE username = ?'
var gameDelete = 'DELETE FROM game WHERE username = ? AND jigsaw = ?'


function connect(callback) {
  // connect to the mysql database
  connection.connect( (err) => {
    if (err) {
      return callback(err)
    }

    // create the table for user passwords
    var userTable = connection.query('CREATE TABLE IF NOT EXISTS users (name VARCHAR(20), password VARCHAR(500))')
    userTable
      .on('error', (err) => {
        winston.error(err)
        return callback(err)
      })
      .on('end', () => {
        // create the table for the game data
        var gameTable = connection.query('CREATE TABLE IF NOT EXISTS game (username VARCHAR(20), jigsaw VARCHAR(50), time1 INT, time2 INT, time3 INT)')
        userTable
          .on('error', (err) => {
            winston.error(err)
            return callback(err)
          })
          .on('end', () => {
            return callback()
          })

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

/**
* Retrieves the top 3 times for each jigsaw
* from this user
**/
function getTimes(username, callback) {
  var inserts = [username]
  var query = mysql.format(gameSelect, inserts)

  connection.query(query, (err, results) => {
    if (err) {
      winston.error(err)
      return callback(err)
    }
    return callback(null, results)
  })
}

/**
* adds a new row to the game table holding the players
* best three times for a certain jigsaw
**/
function addTimes(username, jigsaw, time1, time2, time3) {
  // first delete the old row:
  var inserts = [username, jigsaw]
  var query = mysql.format(gameDelete, inserts)
  connection.query(query, (err, result, rows) => {
    if (err) {
      winston.error(err)
    }

    winston.silly('Deleted a users jigsaw times: '+ JSON.stringify(result))

    // now add the new row!
    connection.query(gameInsert, {username: username, jigsaw: jigsaw, time1: time1, time2: time2, time3: time3}, (err, result) => {
      if (err) {
        winston.error(err)
      }

      winston.silly('Added a users jigsaw times: '+ JSON.stringify(result))
    })
  })
}

module.exports.connect = connect

// game data
module.exports.getTimes = getTimes
module.exports.addTimes = addTimes

// users
module.exports.storeUser = storeUser
module.exports.verifyUser = verifyUser
