// The percentage of the screen which the selection area
// should take up
const selectionAreaPercent = 0.2;
const gameBoardSize = 0.7;

// boolean to help with screen drag
var dragging = false;
var touchX;
var touchY;
var spriteDrag = false;

// on screen information
var timer;
var startTime = Date.now()

var playState = {


  create: function() {

    // Change background color to a light colour
    game.stage.backgroundColor = "#ffffcc";

    // The main layout of the game:
    var graphics = game.add.graphics(0,0);
    graphics.beginFill(0xffffff);

    // Add the selection area for puzzle pieces:
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRect(
      0,
      game.world.height*(1-selectionAreaPercent),
      game.world.width,
      game.world.height*(selectionAreaPercent)
    );

    // place the timer at the top of the game screen
    timer = game.add.text(80, 0,
                    'Time: '+(Date.now()-startTime),
                    {font: '25px Arial', fill: '#0x0000FF'});

    // Draw the game board with the graphics object
    gameboard.draw(graphics);

    // Fill the graphics objects
    graphics.endFill();

    this.keyboard = game.input.keyboard;

    this.player = game.add.sprite(16,16,'player');
    game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.win = game.add.sprite(256,256,'win');
    game.physics.enable(this.win, Phaser.Physics.ARCADE);

    gameboard.addPuzzle('penguin_puzzle');

    // enable touch
    game.input.mouse.capture = true;

    // increase the size of the world to let players move around the puzzle
    game.world.setBounds(0,0,2000,2000);

  },

  update: function() {

    game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);

    // enable horizontal movement
    if (this.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.body.velocity.x = -175;
    } else if (this.keyboard.isDown(Phaser.Keyboard.D)) {
      this.player.body.velocity.x = 175;
    } else {
      this.player.body.velocity.x = 0;
    }

    // enable vertical movement
    if (this.keyboard.isDown(Phaser.Keyboard.W)) {
      this.player.body.velocity.y = -175;
    } else if (this.keyboard.isDown(Phaser.Keyboard.S)) {
      this.player.body.velocity.y = 175;
    } else {
      this.player.body.velocity.y = 0;
    }

    // drag the screen
    this.screenDrag();

    // update timer:
    this.updateTimer();

  },

  screenDrag: function() {
    // drag the screen
    if (game.input.activePointer.isDown){
      // if a sprite is being dragged then we ignore this touch
      if (spriteDrag) {
        dragging = false;
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
                    'Time: '+(Date.now()-startTime),
                    {font: '25px Arial', fill: '#0x0000FF'});
  },

  // Called when a puzzle piece is being dragged
  spriteDrag: function(dragging) {
    spriteDrag = dragging;
  },

  Win: function() {
    // game over, you win!
    game.stage.backgroundColor = "#000000";
    game.state.start('win');
  }
};
