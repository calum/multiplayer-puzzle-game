class GameLobby {

  // wait for the callback before trying to use the
  // gameLobby object
  constructor(serverConnection, callback) {
    this.serverConnection = serverConnection
    this.peerConnection = new PeerConnection()

    var gameLobby = this
    this.peerConnection.getId().then((id) => {
      gameLobby.serverConnection.sendPeerId(id)

      if (callback) {
        callback()
      }

    })
  }

  hostLobby(lobbyName) {
    this.peerConnection.host()
    this.serverConnection.createLobby(lobbyName)
    this.connected = true
  }

  joinLobby(lobbyName, callback) {
    this.serverConnection.getLobbyHostId(lobbyName).then((host_peerId) => {
      console.log('host id: '+host_peerId)
      this.peerConnection.connect(host_peerId)
      this.connected = true
      return callback(null)
    }, (error) => {
      return callback(error)
    })
  }

  sendMessage(msg) {
    this.peerConnection.sendData(msg)
  }

  readNextMessage() {
    if (this.peerConnection.messagesReady()) {
      return this.peerConnection.getNextMessage()
    }
    return false
  }

  /**
  * Called when a player first joins a new lobby
  * updates ever user's connected users list
  **/
  addPlayer(username) {
    var msg = {
      status: 100,
      username: username
    }
    this.sendMessage(msg)
  }

  // called during the update phase of the game mechanics
  update(sprite, dropped) {
    if (!this.connected) {
      return
    }

    var msg = {
      status: 300,
      sprite: {
        name: sprite.name,
        position: {
          x: (sprite.position.x-sprite.finalPosition.x)/boardLength,
          y: (sprite.position.y-sprite.finalPosition.y)/boardLength
        },
      },
      dropped: dropped || null
    }
    this.sendMessage(msg)
  }

  getUpdate() {
    if (!this.connected) {
      return
    }
    var msg
    while(msg = this.readNextMessage()) {
      switch (msg.status) {
        case 300:
          var sprite = puzzlePieces[msg.sprite.name]
          sprite.position.x = (msg.sprite.position.x*boardLength)+sprite.finalPosition.x
          sprite.position.y = (msg.sprite.position.y*boardLength)+sprite.finalPosition.y
          gameboard.dragUpdate(sprite)
          if (msg.dropped) {
            gameboard.onDragStop(sprite, null, true)
          }
          break
        case 100:
          users.add(msg.username)
          break
      }
    }
  }
}

var gameLobby = new GameLobby(serverConnection, () => {

})
