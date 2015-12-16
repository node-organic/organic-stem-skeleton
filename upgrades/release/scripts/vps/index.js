module.exports = function (angel) {
  require('angelabilities-exec')(angel)

  angel.on('vps setup :vpsPath', function (angel) {
    var vpsConfig = require(angel.cmdData.vpsPath)
    var cmd = format("scp {local} {remote}:{dest} && ssh {remote} '{shell} -c {dest}'", vpsConfig)
    console.info(cmd)
    var child = angel.sh(cmd, function (err) {
      process.stdin.unpipe(child.stdin)
      process.stdin.end()
      if (err) {
        console.error(err)
        return process.exit(1)
      } else {
        process.exit(0)
      }
    })
    process.stdin.pipe(child.stdin)
  })
}
