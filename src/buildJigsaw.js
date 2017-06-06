var builder = require('jigsaw-builder')

builder.build(8, './public/assets/alian.png', './public/assets/alian_puzzle/', function (err) {
  console.log('Finished with error: ')
  console.log(err)
})
