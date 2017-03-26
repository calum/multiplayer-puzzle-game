var express = require('express')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var app = express()

var http = require('http').Server(app)

var path = require('path')

var fs = require('fs')

var winston = require('winston')

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

// Serve all public files statically
app.use(express.static(path.join(__dirname+'/public')))

// Send index.html to clients
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/game.html'))
  winston.info('Sending game to new client.')
})

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
app.post('/user', jsonParser, (req,res) => {
  console.log(req.body)
  res.end(JSON.stringify({hello:'world'}))
})

http.listen(port, () => {
  winston.info('Server is listening on port '+port+'.')
})
