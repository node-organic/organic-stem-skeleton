var rmdir = require('rimraf')

test.cleanUploads = function (next) {
  rmdir(test.variables.uploadsDir, next)
}
