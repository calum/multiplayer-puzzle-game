var express = require('express')

var app = express()

var path = require('path')

var winston = require('winston')


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

app.listen(3000, () => {
  winston.info('Server is listening on port 3000.')
})
