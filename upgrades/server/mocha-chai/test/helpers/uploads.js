var request = require('request')

test.upload = function (method, url, token, body, files, next) {
  var r = request({
    uri: url,
    method: method,
    headers: {
      authtoken: token
    }
  }, function (err, res, body) {
    try {
      body = JSON.parse(body)
    } catch (e) {
      return next(e, res, body)
    }
    next(err, res, body)
  })

  var form = r.form()
  form.append('body', JSON.stringify(body))
  for (var key in files) {
    form.append(key, files[key])
  }
}
