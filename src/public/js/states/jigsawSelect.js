var jigsawselect = {
  // This holds the selected jigsaw for the play state
  selectedJigsaw: null,

  // This holds all the jigsaw names
  jigsaws: [],
  times: [],
  addedTimes: false,

  // This holds all the jigsaw image sprites
  jigsawImages: {},

  // loads all the assets
  preload: function() {
    //Ask the server for the players times
    socket.emit('getTimes', 'puzzles');

    socket.on('getTimes', function(times) {
      var times = JSON.parse(times);

      // add these times below the jigsaw pieces:
      jigsawselect.times = times;
    });


    // load the puzzles:
    for (let i=0; i<this.jigsaws.length; i++) {
      var jigsaw = this.jigsaws[i];
      console.log('loading: '+jigsaw);
      game.load.image(jigsaw, '../assets/'+jigsaw+'.png');
    }
  },

  create: function() {
    var columns = 2;
    var rows = Math.ceil(this.jigsaws.length/columns);

    for (let i=0; i<this.jigsaws.length; i++) {

      var jigsaw = this.jigsaws[i];

      var posX = (1+i)*((game.camera.width*0.8)/(this.jigsaws.length+1));
      var posY = ((game.camera.width*0.8)/(this.jigsaws.length+1));

      // Add to the map
      this.jigsawImages[jigsaw] = game.add.sprite(posX, posY, jigsaw);

      // scale down
      this.jigsawImages[jigsaw].scale.x *= ((game.camera.width*0.8)/(this.jigsaws.length+1))/this.jigsawImages[jigsaw].width;
      this.jigsawImages[jigsaw].scale.y *= ((game.camera.width*0.8)/(this.jigsaws.length+1))/this.jigsawImages[jigsaw].height;

      // shift down
      this.jigsawImages[jigsaw].y += this.jigsawImages[jigsaw].height;

      // Add the name:
      this.jigsawImages[jigsaw].name = jigsaw;

      // Add the even handler:
      this.jigsawImages[jigsaw].inputEnabled = true;
      this.jigsawImages[jigsaw].events.onInputDown.add(this.pickJigsaw, this);
    }

    this.addTimes(this.times);
  },

  update: function() {
    if (this.times.length == 0) {
      return;
    }
    else if (!this.addedTimes){
      this.addTimes(this.times);
    }
  },

  addTimes: function(times) {
    // add the players top times for each jigsaw:
    times.forEach(function(topTimes) {
      var jigsawName = topTimes.jigsaw;
      var jigsaw = jigsawselect.jigsawImages[jigsawName];

      var posx = jigsaw.x + jigsaw.width/4;
      var posy = jigsaw.y + jigsaw.height;

      var times = game.add.text(posx,posy,'Top times:',
                      {font: '15px Arial', fill: '#ffffff'});
      var time1 = game.add.text(posx,times.y+times.height,'1) '+topTimes.time1,
                      {font: '15px Arial', fill: '#ffffff'});
      var time2 = game.add.text(posx,time1.y+time1.height,'2) '+topTimes.time2,
                      {font: '15px Arial', fill: '#ffffff'});
      var time3 = game.add.text(posx,time2.y+time2.height,'3) '+topTimes.time3,
                      {font: '15px Arial', fill: '#ffffff'});

      jigsawselect.addedTimes = true;
    });
  },

  pickJigsaw: function(puzzle) {
    sounds.playSound(sounds.clickSounds);
    this.selectedJigsaw = puzzle.name;
    game.state.start('play');
  }
};
