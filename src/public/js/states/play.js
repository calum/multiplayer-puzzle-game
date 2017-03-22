// The percentage of the screen which the selection area
// should take up
const selectionAreaPercent = 0.2;
const gameBoardSize = 0.7;

// boolean to help with screen drag
var dragging = false;
var selectionAreaDragging = false;
var touchX;
var touchY;
var spriteDrag = false;

// on screen information
var onScreen;
var timer;
var startTime = Date.now();

// Selection area
var selectionArea;

var playState = {

  // load the assets
  preload: function() {
    //add loading bar
    loadingbar.create();

    // load the selected puzzle (if one was selected):
    var jigsawName = jigsawselect.selectedJigsaw;
    if (!jigsawName) {
      // if no jigsaw, pick the penguin one
      jigsawName = 'penguin';
    }
    for (var i=0; i<8; i++) {
      for (var j=0; j<8; j++ ){
        game.load.image(jigsawName+'_puzzle'+i+j, '../assets/'+jigsawName+'_puzzle/'+i+j+'.png');
        loadingbar.setPercentage(((i+j)*100)/64);
      }
    }
    game.load.json(jigsawName+'_prop','../assets/'+jigsawName+'_puzzle/properties.json');

    loadingbar.clear();
  },


  create: function() {

    // Add the puzzle piece selection area
    selectionArea = game.add.graphics(0,0);
    selectionArea.beginFill(0xb0d298);
    selectionArea.lineStyle(2, 0x25633b, 1);
    selectionArea.drawRect(
      0,
      game.world.height*(1-selectionAreaPercent),
      game.world.width,
      game.world.height*(selectionAreaPercent)
    );
    selectionArea.endFill();
    selectionArea.fixedToCamera = true;

    // place the timer at the top of the game screen
    timer = game.add.text(80, 0,
                    'Time: '+(Date.now()-startTime),
                    {font: '25px Arial', fill: '#0x0000FF'});

    // The main layout of the game board:
    var graphics = game.add.graphics(0,0);
    graphics.beginFill(0x25633b);
    // Draw the game board with the graphics object
    gameboard.draw(graphics);
    // Fill the graphics objects
    graphics.endFill();

    // Enable the keyboard
    this.keyboard = game.input.keyboard;

    // Add the penguin puzzle if no other is selected
    gameboard.addPuzzle(jigsawselect.selectedJigsaw);

    // enable touch
    game.input.mouse.capture = true;

    // increase the size of the world to let players move around the puzzle
    game.world.setBounds(0,0,2000,2000);

    // create onScreen group:
    onScreen = game.add.group();
    onScreen.add(selectionArea);
    onScreen.add(timer);
    onScreen.add(unsetPieces); // Add pieces from gameboard.js

  },

  update: function() {

    // drag the screen
    this.screenDrag();

    // update timer:
    this.updateTimer();

    // update the selection area
    this.updateSelectionArea();

    // Bring onscreen graphics to the top
    game.world.bringToTop(onScreen);

  },

  // Check for the user pulling the selection area across
  updateSelectionArea: function() {
    // check that the mouse is over the selection area
    if (game.input.activePointer.position.y > game.camera.height*(1-selectionAreaPercent) && game.input.activePointer.isDown) {

      // Then check if we should drag the pieces:
      if (selectionAreaDragging) {
        var dx = game.input.activePointer.position.x - touchX;
        touchX = game.input.activePointer.position.x;

        // Drag the pieces across
        gameboard.moveUnsetPieces(dx);
      }

      else {
        touchX = game.input.activePointer.position.x;
        selectionAreaDragging = true;
      }
    }

    // Stop dragging the pieces when the mouse is up
    else {
      selectionAreaDragging = false;
    }

  },

  screenDrag: function() {
    // drag the screen
    if (game.input.activePointer.isDown){
      // if a sprite is being dragged then we ignore this touch
      if (spriteDrag) {
        dragging = false;
        return;
      }

      // if the player is dragging the selection area then
      // do not also drag the camera
      if (game.input.activePointer.position.y > game.camera.height*(1-selectionAreaPercent)) {
        return;
      }

      if (dragging) {
        var dx = game.input.activePointer.position.x - touchX;
        var dy = game.input.activePointer.position.y - touchY;
        touchX = game.input.activePointer.position.x;
        touchY = game.input.activePointer.position.y;
      }
      else {
        dragging = true;
        touchX = game.input.activePointer.position.x;
        touchY = game.input.activePointer.position.y;
        var dx = 0;
        var dy = 0;
      }
      game.camera.x -= dx;
      game.camera.y -= dy;
      gameboard.moveUnsetPieces(-dx);
    }

    // Stop dragging screen
    if (game.input.activePointer.isUp) {
      dragging = false;
    }
  },

  updateTimer: function() {
    var timerX = game.camera.position.x+80;
    var timerY = game.camera.position.y;
    timer.destroy();
    timer = game.add.text(timerX, timerY,
                    'Time: '+(Math.round((Date.now()-startTime)/1000)),
                    {font: '25px Arial', fill: '#0x0000FF'});
    onScreen.add(timer);
  },

  // Called when a puzzle piece is being dragged
  spriteDrag: function(dragging) {
    spriteDrag = dragging;
  },

  Win: function() {
    // game over, you win!
    game.state.start('win');
  }
};
