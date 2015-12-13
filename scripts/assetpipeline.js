module.exports = function (angel) {
  var parallel = require('../lib/parallel-exec')

  angel.on("develop", function(){
    parallel([
      { cmd: 'node index.js' },
      { cmd: 'node ./node_modules/.bin/angel watch' }
    ])
  })
  angel.on("build", function(){
    parallel([
      { cmd: 'node ./node_modules/.bin/angel buildjs' },
      { cmd: 'node ./node_modules/.bin/angel buildcss' }
    ])
  })
  angel.on("watch", function(){
    parallel([
      { cmd: 'node ./node_modules/.bin/angel watchjs' },
      { cmd: 'node ./node_modules/.bin/angel watchcss' }
    ])
  })
}
