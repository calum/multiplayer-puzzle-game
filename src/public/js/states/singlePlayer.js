
var singleplayerState = {
  create: function() {

    var nameLabel = game.add.text(80,80,'Single Player',
                    {font: '50px Arial', fill: '#ffffff'});

    var quickStartLabel = game.add.text(80, game.world.height-240,
                    'Quick Start (press "Q")',
                    {font: '25px Arial', fill: '#ffffff'});

    var pickPuzzle = game.add.text(80, game.world.height-160,
                    'Pick a puzzle (press "W")',
                    {font: '25px Arial', fill: '#ffffff'});

    var createPuzzle = game.add.text(80, game.world.height-120,
                    'Create a puzzle (press "A")',
                    {font: '25px Arial', fill: '#ffffff'});

    var homeLabel = game.add.text(80, game.world.height-80,
                    'Home (press "E")',
                    {font: '25px Arial', fill: '#ffffff'});

    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var qkey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    var ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);


    // When "w" is pressed, call the start function
    qkey.onDown.addOnce(this.quickstart, this);
    akey.onDown.addOnce(this.createpuzzle, this);
    wkey.onDown.addOnce(this.pickpuzzle, this);
    ekey.onDown.addOnce(this.home, this);
  },

  quickstart: function() {
    game.state.start('play');
  },

  createpuzzle: function() {
    game.state.start('play');
  },

  pickpuzzle: function() {
    game.state.start('play');
  },

  home: function() {
    game.state.start('home');
  }
};
