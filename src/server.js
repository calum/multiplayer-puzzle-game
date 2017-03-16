var express = require('express')

var app = express()

var path = require('path')

var winston = require('winston')

var port = process.env.PORT || 3000;


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

app.listen(port, () => {
  winston.info('Server is listening on port '+port+'.')
})
