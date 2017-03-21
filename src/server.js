var express = require('express')

var app = express()

var http = require('http').Server(app)

var path = require('path')

var fs = require('fs')

var winston = require('winston')

var port = process.env.PORT || 3000;

var networking = require('./networking.js')

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
  res.sendFile(path.join(__dirname+'/public/index.html'))
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

http.listen(port, () => {
  winston.info('Server is listening on port '+port+'.')
})
