var jigsawselect = {
  selectedJigsaw: null,

  create: function() {
    penguin_puzzle = game.add.sprite(80,80, 'penguin');
    linux_puzzle = game.add.sprite(80,320, 'linux');

    penguin_puzzle.scale.x *= 160/penguin_puzzle.width;
    penguin_puzzle.scale.y *= 160/penguin_puzzle.height;
    linux_puzzle.scale.x *= 160/linux_puzzle.width;
    linux_puzzle.scale.y *= 160/linux_puzzle.height;


  }
};
