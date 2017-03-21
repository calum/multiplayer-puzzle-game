var builder = require('jigsaw-builder')

builder.build(8, './public/assets/linux.png', './public/assets/linux_puzzle/', function (err) {
  console.log('Finished with error: ')
  console.log(err)
})
