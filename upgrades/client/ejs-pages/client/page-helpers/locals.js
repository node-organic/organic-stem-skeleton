module.exports = function(locals){

  locals.version = require(process.cwd()+"/package.json").version
  
  locals.timestampUrl = function(path) {
    if(path.indexOf("?") == -1)
      return path+"?v="+locals.version
    else
      return path+"&v="+locals.version
  }
}