
var bootState = {

  username: '',

  preload: function() {
    // load the loading page
    loadingbar.load();
  },

  // The Phaser create function
  create: function () {

    // set the background colour:
    game.stage.backgroundColor = 8095082;

    // save the username
    localStorage.setItem("username",this.username);

    // start the basic listeners:
    socket.on('puzzles', function(listOfPuzzles) {
      console.log(listOfPuzzles);
      jigsawselect.jigsaws = JSON.parse(listOfPuzzles);
    })

    // Call the load state
    game.state.start('load');

  }
};
