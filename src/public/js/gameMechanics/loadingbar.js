var loadingbar = {

  load: function() {
    // bring in the loading bar
    for (var i=0; i<8; i++) {
      for (var j=0; j<8; j++ ){
        game.load.image('loading_puzzle'+i+j, '../assets/loadingbar/loadingpage_puzzle/'+i+j+'.png');
      }
    }
    game.load.json('loading_prop','../assets/loadingbar/loadingpage_puzzle/properties.json');
  },

  // percent loaded
  percent: 0,

  pieces: {},

  // Set the loaded percent
  setPercentage: function(percent) {

  },

  // create the loading board
  create: function() {
    // Open the properties file:
    properties = game.cache.getJSON('loading_prop');
    var puzzle_height = properties.overview.height;
    var puzzle_width = properties.overview.width;
    var puzzleNumXPieces = properties.overview.horizontalPieces;
    var puzzleNumYPieces = properties.overview.verticalPieces;

    var scale = game.world.width*(0.7)/puzzle_width;

    var posX = game.world.width*((1-0.7)/2);
    var posY = game.world.height*((1-0.7 - 0.2)/2);


    for (var i=0; i<8; i++){
      var j=0;
      for (j=0; j<8; j++) {

        var x = posX + properties[''+i+j].topLeftCorner.x*puzzle_width*scale;
        var y = posY + properties[''+i+j].topLeftCorner.y*puzzle_height*scale;

        this.pieces[''+i+j] = game.add.sprite(x, y, 'loading_puzzle'+i+j);
        this.pieces[''+i+j].scale.x *= scale;
        this.pieces[''+i+j].scale.y *= scale;

      }
    }

  }

};
