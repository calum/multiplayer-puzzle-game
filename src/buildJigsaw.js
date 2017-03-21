var builder = require('jigsaw-builder')

builder.build(8, './public/assets/loadingbar/loadingpage.png', './public/assets/loadingbar/loadingpage_puzzle/', function (err) {
  console.log('Finished with error: ')
  console.log(err)
})
