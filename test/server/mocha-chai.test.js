describe('mocha with chai', function () {
  var stemCell = new StemSkeleton(require(process.cwd() + '/mock-stemskeleton.json'))
  before(function (next) {
    stemCell.mockTestFolder(next)
  })
  before(function (next) {
    stemCell.stackUpgrade('core', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('mocha-chai', next)
  })
  after(function (next) {
    stemCell.removeMockedFolder(next)
  })
  it('$angel test', function (next) {
    stemCell.exec('angel test', function (err, stdout) {
      if (err) return next(err)
      next()
    })
  })
})
