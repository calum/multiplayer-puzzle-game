var jigsawselect = {
  // This holds the selected jigsaw for the play state
  selectedJigsaw: null,

  // This holds all the jigsaw names
  jigsaws: [],

  // This holds all the jigsaw image sprites
  jigsawImages: {},

  // loads all the assets
  preload: function() {
    // load the puzzles:
    for (let i=0; i<this.jigsaws.length; i++) {
      var jigsaw = this.jigsaws[i];
      game.load.image(jigsaw, '../assets/'+jigsaw+'.png');
    }
  },

  create: function() {
    var columns = 2;
    var rows = Math.ceil(this.jigsaws.length/columns);

    for (let i=0; i<rows; i++) {
      var piecesLeft = this.jigsaws.length-i*rows;
      if (piecesLeft > columns) {
        piecesLeft = columns;
      }
      for (let j=0; j<piecesLeft; j++) {
        var jigsaw = this.jigsaws[i+j];

        var posX = (1+j)*((game.world.width*0.8)/(this.jigsaws.length+1));
        var posY = (1+i)*((game.world.height*0.8)/(this.jigsaws.length+1));

        // Add to the map
        this.jigsawImages[jigsaw] = game.add.sprite(posX, posY, jigsaw);

        // scale down
        this.jigsawImages[jigsaw].scale.x *= ((game.world.width*0.8)/(this.jigsaws.length+1))/this.jigsawImages[jigsaw].width;
        this.jigsawImages[jigsaw].scale.y *= ((game.world.height*0.8)/(this.jigsaws.length+1))/this.jigsawImages[jigsaw].height;

        // Add the name:
        this.jigsawImages[jigsaw].name = jigsaw;

        // Add the even handler:
        this.jigsawImages[jigsaw].inputEnabled = true;
        this.jigsawImages[jigsaw].events.onInputDown.add(this.pickJigsaw, this);
      }
    }
  },

  pickJigsaw: function(puzzle) {
    sounds.playSound(sounds.clickSounds);
    this.selectedJigsaw = puzzle.name;
    game.state.start('play');
  }
};
