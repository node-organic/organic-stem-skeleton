module.exports = function(angel) {
  angel.on("develop", function(){
    var entries = [
      { cmd: 'npm start', pid: null, child: null },
      { cmd: 'npm run watch', pid: null, child: null }
    ]
    require('../lib/angelabilities-parallel-exec')(entries)
  })
}
