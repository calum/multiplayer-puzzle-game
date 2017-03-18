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

// properties file:
var properties;

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
    properties = game.cache.getJSON(puzzle+'_prop');
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
        puzzlePieces[''+i+j].events.onDragUpdate.add(this.dragUpdate);

        // Add their final position:
        puzzlePieces[''+i+j].finalPosition = {x: x, y: y};

        // Create a graph for each piece:
        utils.createGraph([ puzzlePieces[''+i+j] ],[]);
      }
    }

    // Add all the sprites neighbours as a property
    for (var i=0; i<8; i++){
      var j=0;
      for (j=0; j<8; j++) {

        // Add their neighbours:
        puzzlePieces[''+i+j].neighbours = [
          puzzlePieces[''+(i-1)+j],
          puzzlePieces[''+(i+1)+j],
          puzzlePieces[''+i+(j-1)],
          puzzlePieces[''+i+(j+1)]
        ];

        // initialise the locked array which holds the pieces locked together
        puzzlePieces[''+i+j].locked = [];

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
  },

  dragUpdate: function(sprite, pointer, dragX, dragY, snapPoint) {

    // Find the graph with this sprite and update all other sprites:
    var graph = utils.findGraph(sprite);

    for (let i=0; i<graph.V.length; i++) {
      graph.V[i].position.x = sprite.position.x +   graph.V[i].finalPosition.x - sprite.finalPosition.x;
      graph.V[i].position.y = sprite.position.y +   graph.V[i].finalPosition.y - sprite.finalPosition.y;
    }

    /*
    sprite.moved = true;

    for (let i=0; i<sprite.locked.length; i++) {
      // Check if this sprite has already been moved
      if (sprite.locked[i].moved == false) {
        // update position
        sprite.locked[i].position.x = sprite.position.x + sprite.locked[i].finalPosition.x - sprite.finalPosition.x;
        sprite.locked[i].position.y = sprite.position.y + sprite.locked[i].finalPosition.y - sprite.finalPosition.y;
        // update locked pieces
        gameboard.dragUpdate(sprite.locked[i], pointer, dragX, dragY, snapPoint);
      }
    }
    sprite.moved = false;
    */
  },

  onDragStop: function(sprite, pointer) {
    playState.spriteDrag(false);

    // Remove this piece from the selection area if it has been moved enough
    if (sprite.position.y < game.camera.height*(1-selectionAreaPercent)) {
      unsetPieces.remove(sprite);
      movedPieces.add(sprite);
    }

    // Snap the piece and it's neighbours into place when it is correctly placed:
    if (Math.abs(sprite.position.x - sprite.finalPosition.x) < 5 && Math.abs(sprite.position.y - sprite.finalPosition.y) < 5) {
      var graph = utils.getGraph(sprite);

      for (let i=0; i<graph.V.length; i++) {
        // set the final position
        graph.V[i].position = graph.V[i].finalPosition;
        // remove from one group and put into the set pieces group
        movedPieces.remove(sprite);
        setPieces.add(sprite);
        sprite.input.draggable = false;

        if (setPieces.children.length == properties.overview.horizontalPieces*properties.overview.verticalPieces) {
          play.Win();
        }
      }

    }

    // Check if the piece can be locked into a neighbour piece:
    //  for piece [i,j] it has neighbours  [i-1, j], [i+1, j]
    //                                    [i, j-1], [i, j+1]
    for (let i=0; i < sprite.neighbours.length; i++) {
      if (sprite.neighbours[i]) {
        var neighbour = sprite.neighbours[i];

        var distanceX = sprite.finalPosition.x - neighbour.finalPosition.x;
        var distanceY = sprite.finalPosition.y - neighbour.finalPosition.y;

        if (Math.abs(sprite.position.x - neighbour.position.x - distanceX) < 5 && Math.abs(sprite.position.y - neighbour.position.y - distanceY) < 5) {
          // lock these pieces together!
          sprite.position.x = neighbour.position.x + sprite.finalPosition.x - neighbour.finalPosition.x;
          sprite.position.y = neighbour.position.y + sprite.finalPosition.y - neighbour.finalPosition.y;

          // Join these Graphs together by the edge connecting them
          utils.joinGraphs(utils.findGraph(sprite), utils.findGraph(neighbour), [sprite,neighbour]);

          // remove this neighbour from the sprite
          sprite.neighbours.splice(i,1);

          // remove this sprite from the neighbours of the neighbour
          var index = neighbour.neighbours.indexOf(sprite);
          neighbour.neighbours.splice(index,1);

          // break out the loop
          break;
        }

      }
    }
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
      puzzlePieces[piece].position.y = game.camera.height - 0.5*(selectionArea.height + puzzlePieces[piece].height);
      unsetPieces.add(puzzlePieces[piece]);
    }
  },

  // move all unset pieces to the right by dx amount
  moveUnsetPieces: function(dx, dy) {
    unsetPieces.forEach( function(sprite) {
      sprite.position.x += dx;
      sprite.position.y = dy || game.camera.height + game.camera.position.y - 0.5*(selectionArea.height + sprite.height);
    });
  },

  joinedSprites: {},

};
