var request = require('request')

describe('/api/version', function () {
  before(test.startServer)
  after(test.stopServer)

  it('GET', function (next) {
    request({
      uri: test.variables.apiendpoint + '/version',
      method: 'GET'
    }, function (err, res, body) {
      if (err) return next(err)
      expect(res.statusCode).to.eq(200)
      next()
    })
  })
})
