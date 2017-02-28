// This two dimensional array holds the final
// placement of the puzzle
var puzzlePosition;
var puzzlePieces = {};

var gameboard = {

  /**
  * Drawing the game board:
  * Draw a square with sides
  * proportional to the shortest dimension
  **/
  draw: function(graphics) {
    var boardLength = game.world.height;
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
  addPuzzle: function() {
    var up;
    var left;
    var scale = 0.5;

    // Open the properties file:
    var properties = game.cache.getJSON('linux_puzzle_prop');

    var posX = game.world.width*((1-gameBoardSize)/2);
    var posY = game.world.height*((1-gameBoardSize - selectionAreaPercent)/2);

    for (var i=0; i<8; i++){
      var j=0;
      for (j=0; j<8; j++) {

        up = properties[''+i+j].up;
        left = properties[''+i+j].left;
        puzzlePieces[''+i+j] = game.add.sprite(posX-(left*23*scale), posY-(up*19*scale), ''+i+j);
        puzzlePieces[''+i+j].scale.x *= scale;
        puzzlePieces[''+i+j].scale.y *= scale;

        puzzlePieces[''+i+j].inputEnabled = true;
        puzzlePieces[''+i+j].input.enableDrag();

        //posX += puzzlePieces[''+i+j].width;
        posX += 110*scale;

      }
      posX = game.world.width*((1-gameBoardSize)/2);
      //posY += puzzlePieces[''+i+5].height;
      posY += 90*scale;
    }
  }

};
