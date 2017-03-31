var express = require('express')

// allows application/json to be parsed
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// multer is used to parse multipart/form-data
var multer = require('multer')
var upload = multer()

// support for signed cookies
var cookie = require('cookie-parser')
var cookieSecret = process.env.COOKIE_SECRET
var uuid = require('uuid/v1')

var app = express()

var http = require('http').Server(app)

var path = require('path')

var fs = require('fs')

var winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'silly'

var port = process.env.PORT || 3000;

var networking = require('./networking.js')

var database = require('./database.js')

// start the socket server
networking.start(http)


/**
* The server
*
*
**/

// use the cookie-parser
app.use(cookie(cookieSecret))


// Send index.html to clients
app.get('/', (req, res) => {
  console.log('Cookies: '+JSON.stringify(req.cookies))
  if (req.cookies.io) {
    return res.sendFile(path.join(__dirname+'/public/game.html'))
  }
  res.sendFile(path.join(__dirname+'/public/index.html'))
  winston.info('Sending game to new client.')
})


// Serve all public files statically
app.use(express.static(path.join(__dirname+'/public')))

// respond to requests about the puzzles:
app.get('/puzzles', (req, res) => {
  fs.readdir(path.join(__dirname+'/public/assets/'), (err, files) => {
    if (err) {
      return res.end(err.message)
    }
    files.forEach(file => {
      console.log(file);
    })
    res.end('');
  })
})

// deal with new accounts
app.post('/', upload.array(), (req,res) => {

  if (req.body.register) {
    database.storeUser(req.body.inputEmail, req.body.inputPassword, (message) => {
      if (message) {
        return res.end(message)
      }

      // send the cookie, yum
      res.cookie('account', { name: req.body.inputName || 'guest#'+uuid(), user: req.body.inputEmail})
      res.cookie('username', req.body.inputName)

      res.sendFile(path.join(__dirname+'/public/game.html'))
    })
  }
  else {
    database.verifyUser(req.body.inputEmail, req.body.inputPassword, (message) => {
      if (message) {
        return res.end(message)
      }

      // send the cookie, yum
      res.cookie('account', req.body.inputName || 'guest#'+uuid())
      res.cookie('username', req.body.inputName)

      res.sendFile(path.join(__dirname+'/public/game.html'))
    })
  }
})

http.listen(port, () => {
  database.connect( (err) => {
    winston.error(err);
  })
  winston.info('Server is listening on port '+port+'.')
})
