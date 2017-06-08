
var bootState = {

  username: '',

  preload: function() {
    // load the loading page
    loadingbar.load()
  },

  // The Phaser create function
  create: function () {

    // set the background colour:
    game.stage.backgroundColor = 8095082

    // save the username
    localStorage.setItem("username",this.username)

    // get the list of puzzles from the server
    serverConnection.getPuzzles('return puzzles').then((puzzles) => {
      console.log(puzzles)
      jigsawselect.jigsaws = JSON.parse(puzzles)
    })

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
		game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    // Call the load state
    game.state.start('load')

  }
};
