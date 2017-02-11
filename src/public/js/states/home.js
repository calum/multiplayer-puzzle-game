/**
* The game's home screen
*
* Gives options for 3 other states:
*   single player
*   multiplayer
*   options
**/
var homeState = {

  create: function() {

    var nameLabel = game.add.text(80,80,'Home Screen',
                    {font: '50px Arial', fill: '#ffffff'});

    var singleplayerLabel = game.add.text(80, game.world.height-240,
                    'Single Player (press "Q")',
                    {font: '25px Arial', fill: '#ffffff'});

    var optionsLabel = game.add.text(80, game.world.height-80,
                    'Options (press "E")',
                    {font: '25px Arial', fill: '#ffffff'});

    var multiplayerLabel = game.add.text(80, game.world.height-160,
                    'Multiplayer (press "W")',
                    {font: '25px Arial', fill: '#ffffff'});

    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var qkey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    var ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);


    // When "w" is pressed, call the start function
    qkey.onDown.addOnce(this.singleplayer, this);
    wkey.onDown.addOnce(this.multiplayer, this);
    ekey.onDown.addOnce(this.options, this);

    // Add clickable links:
    singleplayerLabel.inputEnabled = true;
    singleplayerLabel.events.onInputDown.add(this.singleplayer, this);
    optionsLabel.inputEnabled = true;
    optionsLabel.events.onInputDown.add(this.options, this);
    multiplayerLabel.inputEnabled = true;
    multiplayerLabel.events.onInputDown.add(this.multiplayer, this);
  },


  singleplayer: function() {
    game.state.start('singleplayer');
  },

  multiplayer() {
    // call the play state
    game.state.start('multiplayer');
  },

  options() {
    // call the play state
    game.state.start('options');
  },
};
