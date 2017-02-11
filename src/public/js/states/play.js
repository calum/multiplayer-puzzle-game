// The percentage of the screen which the selection area
// should take up
const selectionAreaPercent = 0.2;
const gameBoardSize = 0.7;

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

    // Draw the game board with the graphics object
    gameboard.draw(graphics);

    // Fill the graphics objects
    graphics.endFill();

    this.keyboard = game.input.keyboard;

    this.player = game.add.sprite(16,16,'player');
    game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.win = game.add.sprite(256,256,'win');
    game.physics.enable(this.win, Phaser.Physics.ARCADE);

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
  },

  Win: function() {
    // game over, you win!
    game.stage.backgroundColor = "#000000";
    game.state.start('win');
  }
};
