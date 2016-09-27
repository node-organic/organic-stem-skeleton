module.exports = function (plasma, dna, helpers) {
  return {
    'POST': function (req, res, next) {
      plasma.emit({
        type: 'i18n/save-missing',
        lang: req.body.lang,
        key: req.body.key
      })
      res.body = {success: true}
      next()
    },
    'GET': function (req, res, next) {
      plasma.emit({
        type: 'i18n/dict',
        lang: req.query.lang
      }, function (dict) {
        res.body = dict
        next()
      })
    }
  }
}
