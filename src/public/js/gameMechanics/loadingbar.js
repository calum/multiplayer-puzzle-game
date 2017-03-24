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

  buffer: [],

  setPieces: [],

  // Set the loaded percent
  setPercentage: function(percent) {
    this.percent = percent;
    this.update();
  },

  update: function() {
    var numberOfPieces = (this.percent/100)*this.buffer.length;
    var startingValue = this.setPieces.length;

    for (i = startingValue; i<numberOfPieces; i++) {
      var piece = this.pieces[this.buffer[i]];
      var x = piece.position.x;
      var y = piece.position.y;
      var name = piece.name;
      var scale = piece.scale;

      piece = game.add.sprite(x, y, 'loading_puzzle'+name);
      piece.scale.x *= scale;
      piece.scale.y *= scale;
      this.setPieces.push(piece);
    }
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
    var posY = game.world.height*((0.4)/2);


    for (var i=0; i<8; i++){
      var j=0;
      for (j=0; j<8; j++) {

        var x = posX + properties[''+i+j].topLeftCorner.x*puzzle_width*scale;
        var y = posY + properties[''+i+j].topLeftCorner.y*puzzle_height*scale;

        this.pieces[''+i+j] = {};
        this.pieces[''+i+j].name = ''+i+j;
        this.pieces[''+i+j].position = {x:x,y:y};
        this.pieces[''+i+j].scale = scale;

      }
    }

    // create random array:
    this.buffer = utils.shuffle(Object.keys(this.pieces));

  },

  clear: function() {
    for (var i=0; i<this.setPieces.length; i++){
      this.setPieces[i].destroy();
    }
  },

};
