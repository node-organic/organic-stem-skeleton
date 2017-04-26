var spawn = require('child_process').spawn

describe('electron', function () {
  var stemCell = new StemSkeleton(require(process.cwd() + '/mock-stemskeleton.json'))
  before(function (next) {
    stemCell.mockTestFolder(next)
  })
  before(function (next) {
    stemCell.stackUpgrade('core', next)
  })
  before(function (next) {
    this.timeout(3 * 60000)
    stemCell.stackUpgrade('electron', next)
  })
  after(function (next) {
    stemCell.removeMockedFolder(next)
  })
  it('electron app runs in development mode', function (next) {
    var child = spawn('node', ['./bin/electron-app.js'], {
      cwd: stemCell.targetDir,
      env: Object.assign({
        CELL_MODE: '_development'
      }, process.env)
    })
    setTimeout(function () {
      child.kill('SIGTERM')
      next()
    }, 2 * 1000)
  })
})
