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

// sounds
var jigsawsounds = [];

// radius of pixels when placed within the piece
// will snap into the correct position
var snapradius = 7;

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
  * Add the puzzle
  * to the game board.
  *
  **/
  addPuzzle: function(selectedJigsaw) {

    if (!selectedJigsaw) {
      var selectedJigsaw = 'penguin';
    }

    // Open the properties file:
    properties = game.cache.getJSON(selectedJigsaw+'_prop');
    var puzzle_height = properties.overview.height;
    var puzzle_width = properties.overview.width;
    var puzzleNumXPieces = properties.overview.horizontalPieces;
    var puzzleNumYPieces = properties.overview.verticalPieces;

    var scale = boardLength*(gameBoardSize)/puzzle_height;

    var posX = game.world.width*((1-gameBoardSize)/2);
    var posY = game.world.height*((1-gameBoardSize - selectionAreaPercent)/2);

    for (var i=0; i<8; i++){
      var j=0;
      for (j=0; j<8; j++) {

        var x = posX + properties[''+i+j].topLeftCorner.x*puzzle_width*scale;
        var y = posY + properties[''+i+j].topLeftCorner.y*puzzle_height*scale;

        puzzlePieces[''+i+j] = game.add.sprite(x, y, selectedJigsaw+'_puzzle'+i+j);
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

        // Add the name of this piece:
        puzzlePieces[''+i+j].name = ''+i+j;

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

    // Add the jigsaw sounds:
    sounds.jigsawsounds.push(game.add.audio('jigsawFit1'));
    sounds.jigsawsounds.push(game.add.audio('jigsawFit2'));
    sounds.jigsawsounds.push(game.add.audio('jigsawFit3'));
    sounds.jigsawsounds.push(game.add.audio('jigsawFit4'));
  },

  onDragStart: function(sprite, pointer) {
    playState.spriteDrag(true);
  },

  dragUpdate: function(sprite, pointer, dragX, dragY, snapPoint) {

    // Find the graph with this sprite and update all the other sprites
    // that are connected:
    var graph = utils.findGraph(sprite);

    if (!graph) {
      return;
    }

    for (let i=0; i<graph.V.length; i++) {
      graph.V[i].position.x = sprite.position.x +   graph.V[i].finalPosition.x - sprite.finalPosition.x;
      graph.V[i].position.y = sprite.position.y +   graph.V[i].finalPosition.y - sprite.finalPosition.y;
    }

  },

  onDragStop: function(sprite, pointer) {
    playState.spriteDrag(false);

    // Remove this piece from the selection area if it has been moved enough
    if ( unsetPieces.children.indexOf(sprite) > -1 && sprite.position.y < game.camera.position.y + game.camera.height*(1-selectionAreaPercent)) {
      unsetPieces.remove(sprite);
      movedPieces.add(sprite);

      // compact the selection area to fill the missing space from the sprite being removed
      var indexOfMovedPiece = puzzlePieceOrder.indexOf(sprite.name);
      unsetPieces.forEach(function(piece) {
        var indexOfPiece = puzzlePieceOrder.indexOf(piece.name);
        // If this is to the left, move to the right to fill the new gap
        // If this is to the right, move to the left...
        piece.position.x += 0.6*Math.sign(indexOfMovedPiece-indexOfPiece)*sprite.width;
      });
    }

    // Get the graph for this piece:
    var graph = utils.findGraph(sprite);

    // Snap the piece and it's neighbours into place when it is correctly placed:
    if (Math.abs(sprite.position.x - sprite.finalPosition.x) < snapradius && Math.abs(sprite.position.y - sprite.finalPosition.y) < snapradius) {

      // play the sound of the pieces snapping together
      sounds.playSound(sounds.jigsawsounds);

      // For each piece in the graph, set to the final position:
      for (let i=0; i<graph.V.length; i++) {
        // set the final position
        graph.V[i].position = graph.V[i].finalPosition;
        // remove from one group and put into the set pieces group
        movedPieces.remove(graph.V[i]);
        setPieces.add(graph.V[i]);
        graph.V[i].input.draggable = false;

        var winCondition = properties.overview.horizontalPieces*properties.overview.verticalPieces;
        if (setPieces.children.length == winCondition || utils.getNumGraphs() == 1) {
          playState.Win();
        }
      }

    }

    // Check if any piece in the graph can be locked into a neighbour piece:
    //  for piece [i,j] it has neighbours  [i-1, j], [i+1, j]
    //                                    [i, j-1], [i, j+1]
    var joins = []; // initialise the join array
    for (let j=0; j<graph.V.length; j++) {
      for (let i=0; i < graph.V[j].neighbours.length; i++) {
        if (graph.V[j].neighbours[i]) {
          var neighbour = graph.V[j].neighbours[i];

          // Check that this neighbour isn't already connected to this graph:
          if (graph.V.indexOf(neighbour) > -1) {
            // remove this neighbour from the sprite
            graph.V[j].neighbours.splice(i,1);

            // remove this sprite from the neighbours of the neighbour
            var index = neighbour.neighbours.indexOf(graph.V[j]);
            if (index > -1) {
              neighbour.neighbours.splice(index,1);
            }

            // continue to the next neighbour
            continue;
          }

          var distanceX = graph.V[j].finalPosition.x - neighbour.finalPosition.x;
          var distanceY = graph.V[j].finalPosition.y - neighbour.finalPosition.y;

          // Check if these neighbours are close enough
          if (Math.abs(graph.V[j].position.x - neighbour.position.x - distanceX) < snapradius && Math.abs(graph.V[j].position.y - neighbour.position.y - distanceY) < snapradius) {
            // lock these pieces together!
            graph.V[j].position.x = neighbour.position.x + graph.V[j].finalPosition.x - neighbour.finalPosition.x;
            graph.V[j].position.y = neighbour.position.y + graph.V[j].finalPosition.y - neighbour.finalPosition.y;

            // play the sound of the pieces snapping together
            sounds.playSound(sounds.jigsawsounds);

            // update the positions of all connected pieces:
            this.dragUpdate(graph.V[j],null, graph.V[j].position.x, graph.V[j].position.y, null);

            // Join these Graphs together by the edge connecting them
            joins.push({piece1: graph.V[j], piece2: neighbour, edge: [graph.V[j],neighbour] });

            // remove this neighbour from the sprite
            graph.V[j].neighbours.splice(i,1);

            // remove this sprite from the neighbours of the neighbour
            var index = neighbour.neighbours.indexOf(graph.V[j]);
            if (index > -1) {
              neighbour.neighbours.splice(index,1);
            }

            // Go to next neighbour
            continue;
          }

        }
      }
    }

    // Now join together all the graphs of the newly connected pieces:
    for (let i=0; i<joins.length; i++) {
      // Join these Graphs together by the edge connecting them
      // origonal graphs are removed after each join so we must find the new graph each time
      utils.joinGraphs(utils.findGraph(joins[i].piece1), utils.findGraph(joins[i].piece2), joins[i].edge);
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
