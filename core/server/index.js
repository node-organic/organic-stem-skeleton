var Cell = require('./cell')
var instance = new Cell()

instance.start(function (err) {
  if (err) throw err
  // # build server cell
  instance.plasma.emit({type: 'build', branch: 'server.processes.index.plasma'}, function (err) {
    if (err) throw err
    instance.plasma.emit({type: 'build', branch: 'server.processes.index.membrane'}, function (err) {
      if (err) throw err
    })
  })
})
