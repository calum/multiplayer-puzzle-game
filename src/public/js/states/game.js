
/**
* Create a game 640 pixels by 480 pixels
**/
var game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'gameDiv');
// Should also be a function for onResize

// We add each state
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('home', homeState);
game.state.add('options', optionsState);
game.state.add('singleplayer', singleplayerState);
game.state.add('multiplayer', multiplayerState);
game.state.add('gamelobby', gamelobbyState);
game.state.add('play', playState);
game.state.add('win', winState);

// After all the states are added, start the game
game.state.start('boot');
