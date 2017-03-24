
var bootState = {

  preload: function() {
    // load the loading page
    loadingbar.load();
  },

  // The Phaser create function
  create: function () {

    // set the background colour:
    game.stage.backgroundColor = 8095082;

    // Ask for a username:
    var username = prompt("Enter a username:", "username");
    localStorage.setItem("username",username);

    // start the basic listeners:
    socket.on('puzzles', function(listOfPuzzles) {
      console.log(listOfPuzzles);
      jigsawselect.jigsaws = JSON.parse(listOfPuzzles);
    })

    // Call the load state
    game.state.start('load');

  }
};
