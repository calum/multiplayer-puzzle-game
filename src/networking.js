var io = require('socket.io')

var puzzleList = [
  'linux',
  'penguin'
]

// Start the websockets for multiplayer functions
function start(server) {
  io = io(server)

  io.on('connection', (socket) => {
    // send this user the list of puzzles:
    socket.emit('puzzles', JSON.stringify(puzzleList))
  })
}

module.exports.start = start
