
var winState = {

  times: {},

  create: function() {

    var finishingTime = (Date.now() - startTime)/1000;

    // send the end time to the server
    serverConnection.addTime(JSON.stringify({time: finishingTime, jigsaw: jigsawselect.selectedJigsaw || 'penguin'})).then((topTimes) => {
      // get this users best times for this jigsaw

      var topTimes = JSON.parse(topTimes);

      // remove the loading messages:
      winState.times.time1.destroy();
      winState.times.time2.destroy();
      winState.times.time3.destroy();

      // Add the top three times achieved
      winState.times.time1 = game.add.text(80, game.camera.height*0.3,
        '1) '+topTimes[0],
        {font: '25px Arial', fill: '#ffffff'});
      winState.times.time2 = game.add.text(80, game.camera.height*0.4,
        '2) '+topTimes[1],
        {font: '25px Arial', fill: '#ffffff'});
      winState.times.time3 = game.add.text(80, game.camera.height*0.5,
        '3) '+topTimes[2],
        {font: '25px Arial', fill: '#ffffff'});
    }, (err) => {
      console.log(err)
      alert(err)
    })

    var posX = game.camera.width*((1-gameBoardSize)/2);
    var posY = game.camera.height*((1-gameBoardSize - selectionAreaPercent)/2);

    var finished = game.add.sprite(posX, posY, jigsawselect.selectedJigsaw);
    finished.scale *= game.camera.width*gameBoardSize/finished.height;

    var winLabel = game.add.text(80,game.camera.height*0.1,'You Win!',
                    {font: '50px Arial', fill: '#ffffff'});

    var timer = game.add.text(80, 0,
                    'Time: '+finishingTime,
                    {font: '25px Arial', fill: '#ffffff'});

    var startLabel = game.add.text(80, game.camera.height-160,
                    'Restart',
                    {font: '25px Arial', fill: '#ffffff'});

    var bestTimes = game.add.text(80, game.camera.height*0.2,
                    'Best Times:',
                    {font: '25px Arial', fill: '#ffffff'});
    this.times.time1 = game.add.text(80, game.camera.height*0.3,
                    '1) Loading...',
                    {font: '25px Arial', fill: '#ffffff'});
    this.times.time2 = game.add.text(80, game.camera.height*0.5,
                    '2) Loading...',
                    {font: '25px Arial', fill: '#ffffff'});
    this.times.time3 = game.add.text(80, game.camera.height*0.4,
                    '3) Loading...',
                    {font: '25px Arial', fill: '#ffffff'});

    // Add clickable links:
    winLabel.inputEnabled = true;
    winLabel.events.onInputDown.add(this.restart, this);
    startLabel.inputEnabled = true;
    startLabel.events.onInputDown.add(this.restart, this);
  },

  restart: function() {
    game.state.start('home');
  }

};
