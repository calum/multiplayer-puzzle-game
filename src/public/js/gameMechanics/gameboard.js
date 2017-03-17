// This two dimensional array holds the final
// placement of the puzzle
var puzzlePosition;
var puzzlePieces = {};
var puzzlePieceOrder;
var boardLength;

// Group to hold all the pices in the que
var unsetPieces;
var spriteunset;
var movedPieces;
var setPieces;

var gameboard = {

  /**
  * Drawing the game board:
  * Draw a square with sides
  * proportional to the shortest dimension
  **/
  draw: function(graphics) {
    boardLength = game.world.height;
    if (game.world.height > game.world.width) {
      boardLength = game.world.width;
    }
    graphics.moveTo(0,0);
    graphics.drawRect(
      game.world.width*((1-gameBoardSize)/2),
      game.world.height*((1-gameBoardSize - selectionAreaPercent)/2),
      boardLength*(gameBoardSize),
      boardLength*(gameBoardSize)
    );
  },

  /**
  * Add the linux puzzle
  * to the game board.
  *
  * Some pieces have an extra (23*scale)px width and
  * (19*scale)px height from the jigsaw edges.
  *
  **/
  addPuzzle: function(puzzle) {

    // Open the properties file:
    var properties = game.cache.getJSON(puzzle+'_prop');
    var puzzle_height = properties.overview.height;
    var puzzle_width = properties.overview.width;
    var puzzleNumXPieces = properties.overview.horizontalPieces;
    var puzzleNumYPieces = properties.overview.verticalPieces;

    var scale = boardLength/puzzle_height;

    var posX = game.world.width*((1-gameBoardSize)/2);
    var posY = game.world.height*((1-gameBoardSize - selectionAreaPercent)/2);

    for (var i=0; i<8; i++){
      var j=0;
      for (j=0; j<8; j++) {

        var x = posX + properties[''+i+j].topLeftCorner.x*puzzle_width*scale;
        var y = posY + properties[''+i+j].topLeftCorner.y*puzzle_height*scale;

        puzzlePieces[''+i+j] = game.add.sprite(x, y, puzzle+i+j);
        puzzlePieces[''+i+j].scale.x *= scale;
        puzzlePieces[''+i+j].scale.y *= scale;

        puzzlePieces[''+i+j].inputEnabled = true;

        // Enable drag and 'bring to top'
        puzzlePieces[''+i+j].input.enableDrag(false, true);
        // Assign functions to be called when drag starts/stops
        puzzlePieces[''+i+j].events.onDragStart.add(this.onDragStart, this);
        puzzlePieces[''+i+j].events.onDragStop.add(this.onDragStop, this);

        // Add their final position:
        puzzlePieces[''+i+j].finalPosition = {x: x, y: y};
      }
    }

    // shuffle the pieces
    puzzlePieceOrder = utils.shuffle(Object.keys(puzzlePieces));

    // Add the unset pieces to the unset group
    unsetPieces = game.add.group();
    // Moved pieces will go into the moved group
    movedPieces = game.add.group();
    // Pieces which have been correctly set will go into this group
    setPieces = game.add.group();

    // Place the pieces into the unset position
    this.placePieces();
  },

  onDragStart: function(sprite, pointer) {
    playState.spriteDrag(true);

    // Remove this piece from the unsetPieces group
    if(unsetPieces.children.indexOf(sprite) > -1) {
      //sprite.position.x += unsetPieces.position.x;
      //var y = sprite.position.y;
    //  unsetPieces.remove(sprite);

      //movedPieces.add(sprite);
      //sprite.position.x = x+unsetPieces.position.x;
      //sprite.position.y = y;

    }
  },
  onDragStop: function(sprite, pointer) {
    playState.spriteDrag(false);
  },

  // Places all the pieces along the bottom row in a random order
  placePieces: function() {
    // holds the current position
    var position = 0;

    // Loop over each piece adding it along the bottom row
    for (index in puzzlePieceOrder) {
      // current piece:
      var piece = puzzlePieceOrder[index];

      // Previous piece:
      var lastPiece = (index == 0) ? 0 : index-1;
      lastPiece = puzzlePieceOrder[lastPiece];

      // new position
      position += puzzlePieces[lastPiece].width*(1.2);

      // Add the pieces along the row
      puzzlePieces[piece].position.x = position;
      puzzlePieces[piece].position.y = game.camera.height - selectionArea.position.y - 0.5*(selectionArea.height + puzzlePieces[piece].height);
      unsetPieces.add(puzzlePieces[piece]);
    }
  },

  // move all unset pieces to the right by dx amount
  moveUnsetPieces: function(dx) {
    unsetPieces.position.x += dx;
  }

};
