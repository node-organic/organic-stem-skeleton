var path = require('path')

var DNA = require('organic').DNA
var loadDir = require('organic-dna-fsloader').loadDir
var selectBranch = require('organic-dna-branches').selectBranch

var resolve = require('organic-dna-resolve')
var foldAndMerge = require('organic-dna-fold')

module.exports = function (next) {
  var dna = new DNA()
  loadDir(dna, path.join(process.cwd(), 'dna'), function (err) {
    if (err) return next(err)

    // fold dna based on cell mode
    if (dna[process.env.CELL_MODE]) {
      foldAndMerge(dna, selectBranch(dna, process.env.CELL_MODE))
    }

    // resolve any referrences
    resolve(dna)

    next(null, dna)
  })
}
