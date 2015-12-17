module.exports = function (app, dna) {
  // default not found handler
  app.use(function (req, res, next) {
    res.status(404)
    if (dna.views) {
      res.render('404')
    } else {
      res.end()
    }
  })
  // default error handler
  app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500)
    if (dna.views) {
      res.render('500')
    } else {
      res.end()
    }
  })
}
