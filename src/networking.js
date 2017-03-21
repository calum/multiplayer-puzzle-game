var io = require('socket.io')

// Start the websockets for multiplayer functions
function start(server) {
  io = io(server)

  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

module.exports.start = start
