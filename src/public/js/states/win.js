
var winState = {

  create: function() {

    var winLabel = game.add.text(80,80,'You Win!',
                    {font: '50px Arial', fill: '#00FF00'});

    var startLabel = game.add.text(80, game.world.height-80,
                    'press the "w" key to restart',
                    {font: '25px Arial', fill: '#ffffff'});

    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    // When "w" is pressed, call the start function
    wkey.onDown.addOnce(this.restart, this);

    // Add clickable links:
    startLabel.inputEnabled = true;
    startLabel.events.onInputDown.add(this.restart, this);
  },

  restart: function() {
    game.state.start('home');
  }

};
