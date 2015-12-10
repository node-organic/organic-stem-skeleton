var regExpParameterValidator = function(name, fn) {
  if (fn instanceof RegExp) {
    return function (req, res, next, val) {
      var captures = fn.exec(String(val))
      if (captures) {
        req.params[name] = captures[0]
        next()
      } else {
        next('route')
      }
    }
  }
}
module.exports = function(app) {
  var params = {
    'mongoId': /^[0-9a-fA-F]{24}$/
  }
  for(var key in params)
    app.param(key, regExpParameterValidator(key, params[key]))
}