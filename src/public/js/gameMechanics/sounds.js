var sounds = {
  clickSounds: [],

  jigsawsounds: [],

  // plays a random sound from a sound array
  playSound: function(soundArray) {
    var rand = soundArray[Math.floor(Math.random() * soundArray.length)];

    rand.play();
  }
};
