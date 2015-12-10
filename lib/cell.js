var Nucleus = require("organic-nucleus")
var Plasma = require("organic-plasma")

module.exports = function(){
  var self = this;
  this.plasma = new Plasma()
  if(process.env.TRACEPLASMA)
    this.plasma.pipe(function(c){
      process.stdout.write(JSON.stringify(c)+"\n")
    })
}

module.exports.prototype.build = function(dna) {
  var self = this

  // # construct core
  var nucleus = new Nucleus(this.plasma, dna)

  // # provide self-build pipeline via nucleus
  this.plasma.on("build", function(c, next){
    nucleus.build(c, next)
  })

  // # listen for external interruptions
  this.signintHandler = function(){
    self.stop(function(){
      process.exit()
    })
  }
  process.on("SIGINT", this.signintHandler)
}

module.exports.prototype.on = function(pattern, handler, context) {
  this.plasma.on(pattern, handler, context)
}

module.exports.prototype.start = function(dna, next){
  if(typeof dna == "function") { next = dna; dna = null }

  var self = this
  if(!dna) {
    require('./dna')(function (err, dna) {
      self.build(dna)
      next && next(null, dna)
    })
  } else {
    self.build(dna)
    next && next(null, dna)
  }
}

module.exports.prototype.stop = function(next){
  process.removeListener("SIGINT", this.signintHandler)
  this.plasma.emitAndCollect("kill", next)
}
