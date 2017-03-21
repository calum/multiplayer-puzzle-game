
var loadState = {

  // The Phaser preload function
  preload: function() {

    // Display a loading label to the screen
    var loadingLabel = game.add.text(80, 150, 'loading...',
                      {font: '30px Courier', fill: '#ffffff'});

    // Load all the assets
  },

  create: function() {

    // Call the menu state
    game.state.start('home');

  }
};
