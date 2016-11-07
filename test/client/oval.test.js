describe('oval', function () {
  var stemCell = new StemSkeleton(require(process.cwd() + '/mock-stemskeleton.json'))
  before(function (next) {
    stemCell.mockTestFolder(next)
  })
  before(function (next) {
    stemCell.stackUpgrade('core', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools-client', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools-less', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools-webpack', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools-assets', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('organic-oval-fu', next)
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
