var builder = require('jigsaw-builder')

builder.build(8, './public/assets/penguin.png', './public/assets/penguin_puzzle/', function (err) {
  console.log('Finished with error: ')
  console.log(err)
})
