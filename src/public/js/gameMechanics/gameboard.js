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
  **/
  addPuzzle: function() {

    var posX = game.world.width*((1-gameBoardSize)/2);
    var posY = game.world.height*((1-gameBoardSize - selectionAreaPercent)/2);

    for (var i=0; i<8; i++){
      var j=0;
      for (j=0; j<8; j++) {
        console.log(''+i+j);
        puzzlePieces[''+i+j] = game.add.sprite(posX, posY, ''+i+j);
        puzzlePieces[''+i+j].scale.x *= 0.5;
        puzzlePieces[''+i+j].scale.y *= 0.5;

        puzzlePieces[''+i+j].inputEnabled = true;
        puzzlePieces[''+i+j].input.enableDrag();

        posX += puzzlePieces[''+i+j].width;

      }
      posX = game.world.width*((1-gameBoardSize)/2);
      posY += puzzlePieces[''+i+5].height;
    }
  }

};
