
var loadState = {

  // The Phaser preload function
  preload: function() {

    // Display a loading label to the screen
    var loadingLabel = game.add.text(80, 150, 'loading...',
                      {font: '30px Courier', fill: '#ffffff'});

    // Load all the assets
    game.load.image('player', '../assets/player.png');
    game.load.image('win', '../assets/win.png');

    // Load the linux puzzle:
    for (var i=0; i<8; i++) {
      for (var j=0; j<8; j++ ){
        game.load.image(''+i+j, '../assets/linux_puzzle/'+i+j+'.png');
      }
    }
    game.load.json('linux_puzzle_prop','../assets/linux_puzzle/properties.json');

  },

  create: function() {

    // Call the menu state
    game.state.start('home');

  }
};
