
var multiplayerState = {

  create: function() {
    var nameLabel = game.add.text(80,80,'Multiplayer',
                    {font: '75px Arial', fill: '#ffffff'});

    var joinGameLabel = game.add.text(80, game.camera.height-240,
                    'Join Game (press "Q")',
                    {font: '50px Arial', fill: '#ffffff'});

    var createGameLabel = game.add.text(80, game.camera.height-80,
                    'Create Game (press "W")',
                    {font: '50px Arial', fill: '#ffffff'});

    var homeLabel = game.add.text(80, game.camera.height-160,
                    'Home (press "E")',
                    {font: '50px Arial', fill: '#ffffff'});

    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var qkey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    var ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);


    // When "w" is pressed, call the start function
    qkey.onDown.addOnce(this.joinGame, this);
    wkey.onDown.addOnce(this.createGame, this);
    ekey.onDown.addOnce(this.home, this);

    // Add clickable links:
    joinGameLabel.inputEnabled = true;
    joinGameLabel.events.onInputDown.add(this.joinGame, this);
    createGameLabel.inputEnabled = true;
    createGameLabel.events.onInputDown.add(this.createGame, this);
    homeLabel.inputEnabled = true;
    homeLabel.events.onInputDown.add(this.home, this);
  },

  joinGame: function() {
    sounds.playSound(sounds.clickSounds);
    var gameName = prompt("Please enter a game ID:", "id");
    localStorage.setItem("gameID", gameName);
    game.state.start('play');
  },

  createGame: function() {
    sounds.playSound(sounds.clickSounds);
    var lobbyID = prompt("Please enter a name for your lobby:", "id");
    localStorage.setItem("lobbyID", lobbyID);
    game.state.start('gamelobby');
  },

  home: function() {
    sounds.playSound(sounds.clickSounds);
    game.state.start('home');
  }
};
