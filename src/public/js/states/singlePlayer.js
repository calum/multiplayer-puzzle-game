
var singleplayerState = {
  create: function() {

    var nameLabel = game.add.text(80,80,'Single Player',
                    {font: '50px Arial', fill: '#ffffff'});

    var quickStartLabel = game.add.text(80, game.camera.height-240,
                    'Quick Start (press "Q")',
                    {font: '25px Arial', fill: '#ffffff'});

    var pickPuzzle = game.add.text(80, game.camera.height-160,
                    'Pick a puzzle (press "W")',
                    {font: '25px Arial', fill: '#ffffff'});

    var createPuzzle = game.add.text(80, game.camera.height-120,
                    'Create a puzzle (press "A")',
                    {font: '25px Arial', fill: '#ffffff'});

    var homeLabel = game.add.text(80, game.camera.height-80,
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

    // Add clickable links:
    quickStartLabel.inputEnabled = true;
    quickStartLabel.events.onInputDown.add(this.quickstart, this);
    pickPuzzle.inputEnabled = true;
    pickPuzzle.events.onInputDown.add(this.pickpuzzle, this);
    createPuzzle.inputEnabled = true;
    createPuzzle.events.onInputDown.add(this.createpuzzle, this);
    homeLabel.inputEnabled = true;
    homeLabel.events.onInputDown.add(this.home, this);
  },

  quickstart: function() {
    sounds.playSound(sounds.clickSounds);
    game.state.start('play');
  },

  createpuzzle: function() {
    sounds.playSound(sounds.clickSounds);
    game.state.start('play');
  },

  pickpuzzle: function() {
    sounds.playSound(sounds.clickSounds);
    game.state.start('jigsawselect');
  },

  home: function() {
    sounds.playSound(sounds.clickSounds);
    game.state.start('home');
  }
};
