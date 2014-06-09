module.exports = function(plasma, dna, helpers) {
  return {
    "GET": function(req, res, next){
      res.response = require(process.cwd()+"/package.json").version
      next()
    }
  }
}