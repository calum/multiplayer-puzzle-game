
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

  /**
  * Called when the client wants to send their
  * Peerjs Id to the server to connect to other players
  * Should only be called by PeerConnection
  **/
  sendPeerId(id) {
    this.socket.emit('peerId', id)
  }

  /**
  * Called when a client wants to create
  * a game lobby for multiplayer
  **/
  createLobby(name) {
    this.socket.emit('lobby', JSON.stringify({type: 'create', name: name}))
  }

  /**
  * Called when a client wants to
  * join a game lobby for multiplayer
  **/
  getLobbyHostId(name) {
    this.socket.emit('lobby', JSON.stringify({type: 'join', name: name}))

    return new Promise((fulfill, reject) => {
      this.socket.on('lobby', (message) => {
        var response = JSON.parse(message)

        if (response.status == 'error') {
          return reject(response.message)
        }

        return fulfill(response.peerId)
      })
    })
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
