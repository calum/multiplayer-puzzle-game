
var bootState = {

  // The Phaser create function
  create: function () {

    // Start the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Call the load state
    game.state.start('load');

  }
};
