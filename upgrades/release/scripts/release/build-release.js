module.exports = function (angel) {
  angel.on('build release', function () {
    var path = require('path')
    var format = require('string-template')
    var loadDNA = require('organic-dna-loader')
    var version = require(process.cwd() + '/package.json').version
    var semver = require('semver')
    var exec = require('child_process').exec

    angel.do('build', function () {
      loadDNA(function (err, dna) {
        if (err) throw err
        var options = dna.client.assetpipeline
        var target = format(options.dest.build, {version: version})
        var cwd = process.cwd()
        var link = 'ln -sfT ' + path.join(cwd, target) + ' ' + path.join(cwd, options.dest.watch)
        var childLN = exec(link)
        childLN.stdout.pipe(process.stdout)
        childLN.stderr.pipe(process.stderr)
        childLN.on('exit', function (code) {
          if (code === 0) {
            console.info('done ' + target + ' -> ' + options.dest.watch)
          } else {
            console.error('failed ' + target + ' -> ' + options.dest.watch, 'command:', link)
          }
          process.exit(code)
        })
      })
    })
  })
}
