var request = require('request')

describe('/api/version', function () {
  before(test.startServer)
  after(test.stopServer)

  it('GET', function (next) {
    request({
      uri: test.variables.apihttpendpoint + '/version',
      method: 'GET'
    }, function (req, res, body) {
      expect(res.statusCode).to.eq(200)
      next()
    })
  })
})
