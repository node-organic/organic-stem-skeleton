module.exports = function (app) {
  // mongo validation error transformation
  // note that his should be before default error handler
  app.use(function (err, req, res, next) {
    if (err.name === 'ValidationError') {
      return res.status(400).send(err)
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      var parts = err.message.split('$')
      var fieldName = parts.pop().split('_').shift()
      err.duplicatedField = fieldName
      err.collection = parts.pop().split('.')
      err.collection.pop()
      err.collection = err.collection.pop()
      return res.status(409).send(err)
    }
    next(err)
  })
}
