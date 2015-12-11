module.exports = function (angel) {
  angel.on('watchjs', function () {
    var loadDNA = require('../lib/dna')
    var exec = require("child_process").exec
    var kill = require("killprocess")

    var stopAndExit = function(child){
      return function () {
        kill(child.pid, "SIGINT", function () {
          process.exit(0)
        })
      }
    }
    loadDNA(function (err, dna) {
      var options = dna.client.assetpipeline
      var cmd = 'node ./node_modules/.bin/globify "' + options.src + '/**/*.bundle.js" -w -v -d --outfile=' + options.dest
      var child = exec(cmd)
      child.on("exit", stopAndExit(child))
      child.stdout.pipe(process.stdout)
      child.stderr.pipe(process.stderr)
      process.on("SIGINT", stopAndExit(child))
    })
  })
}
