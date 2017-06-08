class GameLobby {
  constructor(serverConnection) {
    this.serverConnection = serverConnection
    this.peerConnection = new PeerConnection()

    var gameLobby = this
    this.peerConnection.getId().then((id) => {
      gameLobby.serverConnection.sendPeerId(id)
    })
  }
}

var gameLobby = new GameLobby(serverConnection)
