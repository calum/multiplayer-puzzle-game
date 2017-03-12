
var bootState = {

  // The Phaser create function
  create: function () {

    // Start the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Ask for a username:
    var username = prompt("Enter a username:", "username");
    localStorage.setItem("username",username);

    // Call the load state
    game.state.start('load');

  }
};
