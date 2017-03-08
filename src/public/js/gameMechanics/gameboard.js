// This two dimensional array holds the final
// placement of the puzzle
var puzzlePosition;
var puzzlePieces = {};
var boardLength;

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

    var scale = boardLength/puzzle_width;

    var posX = game.world.width*((1-gameBoardSize)/2);
    var posY = game.world.height*((1-gameBoardSize - selectionAreaPercent)/2);

    for (var i=0; i<8; i++){
      var j=0;
      for (j=0; j<8; j++) {

        var x = posX + properties[''+i+j].x*puzzle_width*scale;
        var y = posY + properties[''+i+j].y*puzzle_height*scale;

        puzzlePieces[''+i+j] = game.add.sprite(x, y, puzzle+i+j);
        puzzlePieces[''+i+j].scale.x *= scale;
        puzzlePieces[''+i+j].scale.y *= scale;

        puzzlePieces[''+i+j].inputEnabled = true;
        puzzlePieces[''+i+j].input.enableDrag();

      }
    }
  }

};
