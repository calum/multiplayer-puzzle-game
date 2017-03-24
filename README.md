[![Build Status](https://travis-ci.org/CalumForsterDev/multiplayer-puzzle-game.svg?branch=frontend)](https://travis-ci.org/CalumForsterDev/multiplayer-puzzle-game) [![Stories in Ready](https://badge.waffle.io/CalumForsterDev/multiplayer-puzzle-game.svg?label=ready&title=Ready)](http://waffle.io/CalumForsterDev/multiplayer-puzzle-game)


Any help would be appreciated. The issues are really vague at the time of writing and so any pull requests will probably be accepted, regardless of how you solved the issue.
When working on backend features, try to add tests to the `test/` directory. These are run with [mocha](https://mochajs.org/).

All pushes and merges to the master branch are deployed automatically by Tavis-ci onto the [amazon server](http://lowcost-env.arxiwpmmng.us-west-2.elasticbeanstalk.com/).

All pull requests will be deployed onto an Heroku server to be tested (https://dashboard.heroku.com/apps/salty-fortress-42911). This deployment is manually done by a main contibutor clicking the deploy button on the heroku app page.

# Multiplayer Puzzle Game
A fast paced competitive puzzle solving game built on [Phaser.io](http://phaser.io). Inspiration taken from the single player game [jumbo jav ban haasteren](http://jumbo-jan-van-haasteren.fbrq.io/jumbo-jan-van-haasteren/index.html)

To checkout the current version of the game, [click here](http://lowcost-env.arxiwpmmng.us-west-2.elasticbeanstalk.com/).

## Game States
The Phaser game states are all defined inside `src/public/js/states/`. These are where the game home page and different options are created.


## Rough Development Plan

- [x] Release 0.1 - Frontend design [Completed 16/03/17]
- [x] Release 0.2 - Module to create puzzle pieces from an image [Completed 8/03/17]
- [x] Release 0.3 - Game mechanics [Completed 24/03/17]
- [ ] Release 0.4 - Single player puzzle game
- [ ] Release 0.5 - Server/Client communications
- [ ] Release 0.6 - Game lobby with ranking by time for each puzzle
- [ ] Release 0.7 - Co-operative puzzle solving
- [ ] Release 0.8 - Competitive puzzle solving with wepons
- [ ] Release 0.9 - users can create personal puzzles

- [ ] Release 1.0 - Competitive multiplayer puzzle game

[![Throughput Graph](https://graphs.waffle.io/CalumForsterDev/multiplayer-puzzle-game/throughput.svg)](https://waffle.io/CalumForsterDev/multiplayer-puzzle-game/metrics/throughput)
