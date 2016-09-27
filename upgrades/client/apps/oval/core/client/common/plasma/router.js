module.exports = function (plasma, dna) {
  var Director = require('director').Router
  var router = plasma.router = new Director(dna.routes).configure(dna.director)
  router.url = {}
  router.navigate = function (path) {
    router.setRoute(path)
  }
  if (dna.params) {
    for (var param in dna.params) {
      router.param(param, dna.params[param])
    }
  }
  var buildUrlFn = function (key) {
    var matches = dna.urls[key].match(/:([a-zA-Z0-9]*)/g)
    router.on(dna.urls[key], function () {
      var params = {}
      if (matches) {
        for (var i = 0; i < matches.length; i++) {
          params[matches[i].replace(':', '')] = arguments[i]
        }
      }
      window.plasma.storeAndOverride({
        type: 'url-change',
        url: dna.urls[key],
        params: params
      })
    })
    return function () {
      var result = dna.urls[key]
      if (matches) {
        for (var i = 0; i < matches.length; i++) {
          result = result.replace(matches[i], arguments[i] || matches[i])
        }
      }
      return result
    }
  }
  for (var key in dna.urls) {
    router.url[key] = buildUrlFn(key)
  }

  router.init()
}
