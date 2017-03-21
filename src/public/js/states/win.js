
var winState = {

  create: function() {

    var winLabel = game.add.text(80,80,'You Win!',
                    {font: '50px Arial', fill: '#ffffff'});

    var startLabel = game.add.text(80, game.world.height-160,
                    'Restart',
                    {font: '25px Arial', fill: '#ffffff'});

    // Add clickable links:
    winLabel.inputEnabled = true;
    winLabel.events.onInputDown.add(this.restart, this);
    startLabel.inputEnabled = true;
    startLabel.events.onInputDown.add(this.restart, this);
  },

  restart: function() {
    game.state.start('home');
  }

};
