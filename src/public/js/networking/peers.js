class PeerConnection {
  /**
  * get the PeerJS Id and send it to the server
  * initialise variables
  **/
  constructor() {
    this.peer = new Peer({key: 'lwjd5qra8257b9'})
    this.connections = []
    this.messages = []

    var peerConn = this

    this.peer.on('open', (id) => {
      console.log('My peer id is: '+id)

      // set the peerjs Id
      peerConn.id = id
    })
  }

  /**
  * if this is called immediately after creating
  * the PeerConnection object then it returns a promise.
  * Otherwise it will return the peerId
  **/
  getId() {
    if (this.id) {
      return this.id
    } else {
      var peerConn = this
      return new Promise((fulfill) => {
        peerConn.peer.on('open', (id) => {
          fulfill(id)
        })
      })
    }
  }

  addConnection(conn) {
    this.connections.push(conn)
  }

  getConnections() {
    return this.connections
  }

  addMessage(msg) {
    this.messages.push(msg)
  }

  getNextMessage() {
    return this.messages.shift()
  }

  messagesReady() {
    return this.messages.length
  }

  /**
  * Called when a connection is required
  * between to peers.
  **/
  connect(destPeerId) {
    var conn = this.peer.connect(destPeerId)

    var peerConn = this

    this.addConnection(conn)

    conn.on('open', () => {
      // Receive messages
      conn.on('data', (data) => {
        peerConn.addMessage(data)
      })
    })
  }

  /**
  * called when this peer is ready to
  * receive a connection
  **/
  host() {
    var peerConn = this

    this.peer.on('connection', (conn) => {
      console.log('aquired new connection')
      peerConn.addConnection(conn)

      // Receive messages
      conn.on('data', (data) => {
        peerConn.addMessage(data)
        peerConn.sendData(data, conn)
      })
    })
  }

  /**
  * Called when peers are connected
  * and data is to be sent to all connected peers
  **/
  sendData(data, fromConn) {
    this.getConnections().forEach((conn) => {
      if (fromConn) {
        if (conn.label == fromConn.label) {
          return
        }
      }
      conn.send(data)
    })
  }
}
