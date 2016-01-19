'use strict'
var Nucleus = require('organic-nucleus')
var Plasma = require('organic-plasma')
var loadDna = require('organic-dna-loader')

module.exports = class Cell {
  constructor () {
    this.plasma = require('organic-plasma-feedback')(new Plasma())
    if (process.env.TRACEPLASMA) {
      this.plasma.pipe((c) => {
        process.stdout.write(JSON.stringify(c) + '\n')
      })
    }
  }

  build (dna) {
    // # construct core
    var nucleus = new Nucleus(this.plasma, dna)

    // # provide self-build pipeline via nucleus
    this.plasma.on('build', (c, next) => {
      nucleus.build(c, next)
    })

    // # listen for external interruptions
    this.signintHandler = () => {
      this.stop()
    }
    process.on('SIGINT', this.signintHandler)
  }

  on (pattern, handler, context) {
    this.plasma.on(pattern, handler, context)
  }

  start (dna, next) {
    if (typeof dna === 'function') { next = dna; dna = null }

    if (!dna) {
      loadDna((err, dna) => {
        if (err) return next && next(err)
        this.build(dna)
        next && next(null, dna)
      })
    } else {
      this.build(dna)
      next && next(null, dna)
    }
  }

  stop (next) {
    process.removeListener('SIGINT', this.signintHandler)
    this.plasma.emit('kill')
  }
}
