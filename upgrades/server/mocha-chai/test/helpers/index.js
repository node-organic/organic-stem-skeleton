/**
 * define CELL_MODE if not present
 */
process.env.CELL_MODE = process.env.CELL_MODE || '_test'

var path = require('path')
var chai = require('chai')
var _ = require('lodash')

global.expect = chai.expect

var test = global.test = {}
var variables = test.variables = {
  cell: null,
  dna: null,
  httpendpoint: 'http://127.0.0.1:13371',
  apiendpoint: 'http://127.0.0.1:13371/api',
  uploadsDir: path.join(process.cwd(), '/test/uploads')
}

require('./clean-uploads')
require('./uploads')

test.initTestEnv = function (done) {
  var loadDna = require('organic-dna-loader')
  loadDna(function (err, dna) {
    if (err) return done(err)

    test.variables.dna = dna

    test.cleanUploads(done)
  })
}

test.startServer = function (next) {
  test.initTestEnv(function (err) {
    if (err) return next(err)
    var cell = variables.cell = require('../../server/start')()
    var readyChemcals = _.get(test.variables, 'dna.server.processes.index.membrane.organic-express-server.expressSetupDoneOnce', ['ApiRoutesReady'])
    cell.plasma.on(readyChemcals, function (err) {
      if (err instanceof Error) return next(err)
      next && next()
    })
  })
}

test.stopServer = function (next) {
  variables.cell.plasma.emit('kill', next)
}
