
var loadState = {

  // The Phaser preload function
  preload: function() {

    // Display a loading label to the screen
    var loadingLabel = game.add.text(80, 150, 'loading...',
                      {font: '30px Courier', fill: '#ffffff'});

    // Load all the assets

    // load the sounds:

    // load the jigsaw sounds:
    game.load.audio('jigsawFit1', 'assets/sounds/jigsawpiecePlaced/1.mp3');
    game.load.audio('jigsawFit2', 'assets/sounds/jigsawpiecePlaced/2.mp3');
    game.load.audio('jigsawFit3', 'assets/sounds/jigsawpiecePlaced/3.mp3');
    game.load.audio('jigsawFit4', 'assets/sounds/jigsawpiecePlaced/4.mp3');

    // load click sounds
    game.load.audio('click1', 'assets/sounds/clicks/1.mp3');
  },

  create: function() {

    // Call the menu state
    game.state.start('home');

  }
};
