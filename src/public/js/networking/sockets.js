
class ServerConnection {

  constructor() {
    // create websocket:
    this.socket = io()

    // save the username:
    var cookie = document.cookie
    var username = cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")

    if (!username) {
      username = 'guest'
    }

    bootState.username = username;

    console.log('username: '+username)
  }

  getTimes(query) {
    return new Promise((fulfill) => {
      //Ask the server for the players times
      this.socket.emit('getTimes', query)

      this.socket.on('getTimes', function(times) {
        return fulfill(times)
      })
    })
  }

  getPuzzles(query) {
    return new Promise((fulfill) => {
      //Ask the server for the players times
      this.socket.emit('puzzles', query)

      this.socket.on('puzzles', function(puzzles) {
        return fulfill(puzzles)
      })
    })
  }

  addTime(query) {
    return new Promise((fulfill, reject) => {
      //Ask the server for the players times
      this.socket.emit('time', query)

      this.socket.on('error', function(errorMessage) {
        return reject(errorMessage)
      })

      this.socket.on('times', function(besttimes) {
        return fulfill(besttimes)
      })
    })
  }
}

var serverConnection = new ServerConnection()
