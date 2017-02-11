// This two dimensional array holds the final
// placement of the puzzle
var puzzlePosition;

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
  }

};
