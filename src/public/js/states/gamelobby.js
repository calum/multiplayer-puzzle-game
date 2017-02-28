var users = ['John', 'Calum'];
var usernames = {};

var gamelobbyState = {
  create: function() {
    var nameLabel = game.add.text(80,80,'Lobby',
                    {font: '50px Arial', fill: '#ffffff'});

    var startLabel = game.add.text(80, game.world.height-240,
                    'Start Game (press "Q")',
                    {font: '25px Arial', fill: '#ffffff'});

    var selectpuzzleLabel = game.add.text(80, game.world.height-80,
                    'Select puzzle (press "W")',
                    {font: '25px Arial', fill: '#ffffff'});

    var closelobbyLabel = game.add.text(80, game.world.height-160,
                    'Close Lobby (press "E")',
                    {font: '25px Arial', fill: '#ffffff'});

    var connectedUsers = game.add.text(game.world.width-320, 25,
                    'Connected users:',
                    {font: '25px Arial', fill: '#ffffff'});

    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var qkey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    var ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);

    // Setup text event for clicks
    startLabel.inputEnabled = true;
    startLabel.events.onInputDown.add(this.startGame, this);

    selectpuzzleLabel.inputEnabled = true;
    selectpuzzleLabel.events.onInputDown.add(this.selectpuzzle, this);

    closelobbyLabel.inputEnabled = true;
    closelobbyLabel.events.onInputDown.add(this.close, this);


    // When "w" is pressed, call the start function
    qkey.onDown.addOnce(this.startGame, this);
    wkey.onDown.addOnce(this.selectpuzzle, this);
    ekey.onDown.addOnce(this.close, this);
  },

  update: function() {
    // Keep updating the connected users list:
    for (let i=0; i<users.length; i++) {
      if (usernames[users[i]]) {
        continue;
      }
      usernames[users[i]] = game.add.text(game.world.width-320, 30*(i+2),
                      users[i],
                      {font: '20px Arial', fill: '#ffffff'});
    }
  },

  startGame: function() {
    game.state.start('play');
  },

  selectpuzzle: function() {
    game.state.start('play');
  },

  close: function() {
    game.state.start('home');
  }
};
