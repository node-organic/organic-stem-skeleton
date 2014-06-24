var Nucleus = require("organic-nucleus")
var Plasma = require("organic-plasma")
var DNA = require("organic-dna")
var path = require("path")
var _ = require("underscore")

var resolveReferences = require("organic-dna-resolvereferences")
var foldAndMerge = require("organic-dna-fold")

process.env.CELL_MODE = process.env.CELL_MODE || "_development";

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
  // # prepere dna

  // fold dna based on cell mode
  if(dna[process.env.CELL_MODE]) {
    foldAndMerge(dna, process.env.CELL_MODE)
  }

  // resolve any referrences
  resolveReferences(dna)

  // # construct core
  var nucleus = new Nucleus(this.plasma, dna)

  // # provide self-build pipeline via nucleus
  this.plasma.on("build", function(c, next){
    nucleus.build(c, next)
  })

  // # build cell
  this.plasma.emit({type: "build", branch: "processes.index.plasma"}, function(){
    self.plasma.emit({type: "build", branch: "processes.index.membrane"})  
  })
  
  
  // # listen for external interruptions
  process.on("SIGINT", function(){
    self.stop(function(){
      process.exit()
    })
  })
}

module.exports.prototype.on = function(pattern, handler, context) {
  this.plasma.on(pattern, handler, context)
}

module.exports.prototype.start = function(dna, next){
  if(typeof dna == "function") { next = dna; dna = null }

  var self = this
  if(!dna) {
    var dna = new DNA()
    dna.loadDir(path.join(__dirname,"dna"), function(err){
      if(err) return next(err)
      self.build(dna)
      next && next()
    })
  } else {
    this.build(dna)
    next && next()
  }
}

module.exports.prototype.stop = function(next){
  this.plasma.emitAndCollect("kill", next)
}

if(!module.parent) {
  var instance = new module.exports()
  instance.start(function(err){
    if(err) throw err
  })
}