var io = require('socket.io')
var winston = require('winston')
var database = require('./database.js')

// a game lobby has the properties:
// {host: {name: username, peerId: peerId}, users: [{name: username, peerId: peerId}]}
var gameLobbies = {}

var puzzleList = [
  'penguin',
  'yoda',
  'alian'
]

// Start the websockets for multiplayer functions
function start(server) {
  io = io(server)

  io.on('connection', (socket) => {

    // get this users name
    var cookie = socket.request.headers.cookie
    var username = cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    var peerId = null

    // send this user the list of puzzles:
    socket.emit('puzzles', JSON.stringify(puzzleList))

    // Get the users peerjs id for joining peers together
    socket.on('peerId', (msg) => {
      peerId = msg
    })

    // deal with requests to create a group
    // request of the form: msg = {type: 'create', name: 'name'}
    //                            {type: 'join', name: 'name'}
    socket.on('lobby', (msg) => {
      var request = JSON.parse(msg)
      switch (request.type) {
        case 'create':
          gameLobbies[request.name] = {host: username, peerId: peerId}
          console.log('created game lobby: ')
          console.log(gameLobbies)
          break
        case 'join':
          if (!gameLobbies[request.name]) {
            var errorMsg = {status: 'error', message: 'No lobby found with that name'}
            socket.emit('lobby', JSON.stringify(errorMsg))
            break
          }
          var successMsg = {status: 'valid', peerId: gameLobbies[request.name].peerId}
          socket.emit('lobby', JSON.stringify(successMsg))
          console.log('sent game lobby: ')
          console.log(successMsg)
          break
      }
    })

    socket.on('puzzles', (msg) => {
      socket.emit('puzzles', JSON.stringify(puzzleList))
    })

    // send the players top times:
    socket.on('getTimes', (msg) => {
      database.getTimes(username, (err, times) => {
        if (err) {
          winston.error(err)
        }
        socket.emit('getTimes', JSON.stringify(times))
      })
    })

    // update the database with this users new times
    socket.on('time', (msg) => {
      // {time: finishingTime, jigsaw: selectedJigsaw}
      var result = {time: null, jigsaw: null}
      try {
        result = JSON.parse(msg)
      } catch (e) {
        winston.error(e)
      }

      if (!result) {
        socket.emit('error', "Error submiting time to the database. Send your time to 'calumforster.play@gmail.com' to fix the issue.")
      }
      else {
        database.getTimes(username, (err, times) => {
          if (err) {
            winston.error(err)
          }

          // check if this new time is in the top three for this
          // jigsaw
          var jigsawTimes = times.filter( (jigsawTimes) => {
            // filter to get the times for the specified jigsaw
            return jigsawTimes.jigsaw == result.jigsaw
          })

          var bestTimes = [0,0,0]

          if (jigsawTimes[0] == null) {
            // no times have been recorded!

            // add this time to be the top time for this user
            database.addTimes(username, result.jigsaw, result.time, 0, 0)
            bestTimes[0] = result.time
          }
          else {
            if (jigsawTimes[0].time3 < result.time && jigsawTimes[0].time3 != 0) {
              // do nothing since this is slower than the best 3
              bestTimes[0] = (jigsawTimes[0].time1)
              bestTimes[1] = (jigsawTimes[0].time2)
              bestTimes[2] = (jigsawTimes[0].time3)
            }
            else if (result.time < jigsawTimes[0].time1 || jigsawTimes[0].time1 == 0) {
              // New best time!
              database.addTimes(username, result.jigsaw, result.time, jigsawTimes[0].time1, jigsawTimes[0].time2)
              bestTimes[0] = (result.time)
              bestTimes[1] = (jigsawTimes[0].time1)
              bestTimes[2] = (jigsawTimes[0].time2)
            }
            else if (result.time < jigsawTimes[0].time2 || jigsawTimes[0].time2 == 0) {
              // new second best time!
              database.addTimes(username, result.jigsaw, jigsawTimes[0].time1, result.time, jigsawTimes[0].time2)
              bestTimes[0] = (jigsawTimes[0].time1)
              bestTimes[1] = (result.time)
              bestTimes[2] = (jigsawTimes[0].time2)
            }
            else if (result.time < jigsawTimes[0].time3 || jigsawTimes[0].time3 == 0) {
              // new third best time!
              database.addTimes(username, result.jigsaw, jigsawTimes[0].time1, jigsawTimes[0].time2, result.time)
              bestTimes[0] = (jigsawTimes[0].time1)
              bestTimes[1] = (jigsawTimes[0].time2)
              bestTimes[2] = (result.time)
            }
          }

          socket.emit('times', JSON.stringify(bestTimes))
        })
      }



    })
  })


}

module.exports.start = start
