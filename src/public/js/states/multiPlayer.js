
var multiplayerState = {

  create: function() {
    var nameLabel = game.add.text(80,80,'Multiplayer',
                    {font: '75px Arial', fill: '#ffffff'})

    var joinGameLabel = game.add.text(80, game.camera.height-240,
                    'Join Game',
                    {font: '50px Arial', fill: '#ffffff'})

    var createGameLabel = game.add.text(80, game.camera.height-160,
                    'Create Game',
                    {font: '50px Arial', fill: '#ffffff'})

    var homeLabel = game.add.text(80, game.camera.height-80,
                    'Home',
                    {font: '50px Arial', fill: '#ffffff'})

    // Add clickable links:
    joinGameLabel.inputEnabled = true
    joinGameLabel.events.onInputDown.add(this.joinGame, this)
    createGameLabel.inputEnabled = true
    createGameLabel.events.onInputDown.add(this.createGame, this)
    homeLabel.inputEnabled = true
    homeLabel.events.onInputDown.add(this.home, this)
  },

  joinGame: function() {
    sounds.playSound(sounds.clickSounds)
    var gameName = prompt("Please enter a game ID:", "id")
    localStorage.setItem("lobbyID", gameName)

    // attempt to join the game
    gameLobby.joinLobby(gameName, (err) => {
      if (err) {
        alert(err)
      }
      else {
        game.state.start('gamelobby')
      }
    })

  },

  createGame: function() {
    sounds.playSound(sounds.clickSounds)
    var lobbyID = prompt("Please enter a name for your lobby:", "id")
    localStorage.setItem("lobbyID", lobbyID)

    // create the game lobby and start hosting
    gameLobby.hostLobby(lobbyID)

    game.state.start('gamelobby')
  },

  home: function() {
    sounds.playSound(sounds.clickSounds)
    game.state.start('home')
  }
};
