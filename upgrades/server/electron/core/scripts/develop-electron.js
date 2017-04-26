module.exports = function (angel) {
  angel.on('develop electron', function (angel) {
    process.env.CELL_MODE = process.env.CELL_MODE || '_development'
    var parallel = require('organic-stem-devtools/lib/parallel-exec')
    parallel([
      'node ./node_modules/.bin/angel watch',
      'node ./bin/electron-app.js'
    ])
  })
  .example('angel develop electron')
  .description('1. runs "angel watch" which builds and watches the client impl. for changes\n' +
               '2. starts the electron app')
}
