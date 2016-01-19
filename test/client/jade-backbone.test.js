describe('jade-backbone', function () {
  var stemCell = new StemSkeleton(require(process.cwd() + '/mock-stemskeleton.json'))
  before(function (next) {
    stemCell.mockTestFolder(next)
  })
  after(function (next) {
    stemCell.removeMockedFolder(next)
  })
  it('$angel build', function (next) {
    stemCell.exec('angel build', function (err, stdout) {
      if (err) return next(err)
      next()
    })
  })
  it('$angel watch', function (next) {
    var child = stemCell.exec('angel watch')
    child.stdout.on('data', function (chunk) {
      // TODO buffer until expect successfully
      stemCell.forceExit(child, next)
    })
  })
})
