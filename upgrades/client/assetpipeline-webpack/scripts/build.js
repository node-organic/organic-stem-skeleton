module.exports = function(angel) {
  angel.on("build", function(){
    var entries = [
      { cmd: 'node ./node_modules/.bin/angel buildjs', pid: null, child: null },
      { cmd: 'node ./node_modules/.bin/angel buildcss', pid: null, child: null }
    ]
    require('../lib/angelabilities-parallel-exec')(entries)
  })
}
