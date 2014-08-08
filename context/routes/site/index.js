module.exports = function(){
  return {
    "GET *": function(req, res, next){
      res.locals.version = require(process.cwd()+"/package.json").version
      next()
    }
  }
}