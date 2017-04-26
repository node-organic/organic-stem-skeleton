#!/usr/bin/env node
var path = require('path')
var spawn = require('child_process').spawn
var electron = require('electron')
var app_path = path.join(__dirname, '/../')

var child = spawn(electron, [app_path])

child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)
child.on('exit', function (code) {
  process.exit(code)
})
process.on('SIGTERM', function () {
  child.kill()
  process.exit(0)
})
