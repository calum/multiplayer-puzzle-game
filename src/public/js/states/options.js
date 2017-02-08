
var optionsState = {
  create: function() {

    var nameLabel = game.add.text(80,80,'Options',
                    {font: '50px Arial', fill: '#ffffff'});

    var homeLabel = game.add.text(80, game.world.height-160,
                    'Home (press "E")',
                    {font: '25px Arial', fill: '#ffffff'});

    var ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);


    // When "w" is pressed, call the start function
    ekey.onDown.addOnce(this.home, this);
  },

  home() {
    // call the play state
    game.state.start('home');
  },
};
