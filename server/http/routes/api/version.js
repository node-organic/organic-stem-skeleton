module.exports = function(plasma, dna, helpers) {
  return {
    "GET": function(req, res, next){
      res.body = require(process.cwd()+"/package.json").version
      next()
    }
  }
}