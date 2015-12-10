module.exports = function(angel) {
  angel.on("watch", function(){
    var entries = [
      { cmd: 'node ./node_modules/.bin/angel watchjs', pid: null, child: null },
      { cmd: 'node ./node_modules/.bin/angel watchcss', pid: null, child: null }
    ]
    require('../lib/angelabilities-parallel-exec')(entries)
  })
}
