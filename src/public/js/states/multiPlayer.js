
var multiplayerState = {

  create: function() {
    var nameLabel = game.add.text(80,80,'Multiplayer',
                    {font: '50px Arial', fill: '#ffffff'});

    var joinGameLabel = game.add.text(80, game.world.height-240,
                    'Join Game (press "Q")',
                    {font: '25px Arial', fill: '#ffffff'});

    var createGameLabel = game.add.text(80, game.world.height-80,
                    'Create Game (press "W")',
                    {font: '25px Arial', fill: '#ffffff'});

    var homeLabel = game.add.text(80, game.world.height-160,
                    'Home (press "E")',
                    {font: '25px Arial', fill: '#ffffff'});

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
    game.state.start('play');
  },

  createGame: function() {
    game.state.start('gamelobby');
  },

  home: function() {
    game.state.start('home');
  }
};
