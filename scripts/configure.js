module.exports = function (angel) {
  angel.on('configure', function () {
    var fs = require('fs')
    var path = require('path')
    var glob = require('glob-stream')
    var async = require('async')
    var inquirer = require('inquirer')
    var arrayUniq = require('array-uniq')
    var format = require('string-template')

    var files = []

    // borrowed from http://stackoverflow.com/questions/11222406/how-to-get-placeholder-from-string-in-javascript
    function getPlaceholders(str) {
      var regexp = /\{([\w]+)\}/g
      var result = []
      while (match = regexp.exec(str)) {
        result.push(match[1])
      }
      return result
    }

    var scanPlaceholders = function (files, done) {
      var results = []
      var filesWithPlaceholders = []
      async.eachSeries(files, function (file, nextFile) {
        fs.readFile(file, function (err, content) {
          if (err) return nextFile(err)
          content = content.toString()
          if (/\{([\w]+)\}/.test(content)) {
            filesWithPlaceholders.push(file)
            results = results.concat(getPlaceholders(content))
          }
          nextFile()
        })
      }, function (err) {
        if (err) return done(err)
        done(null, arrayUniq(results), filesWithPlaceholders)
      })
    }

    var createAnswers = function (placeholders) {
      return placeholders.map(function (p) {
        return {
          type: 'input',
          name: p,
          message: p
        }
      })
    }

    var updateFiles = function (files, data, done) {
      async.eachSeries(files, function (file, nextFile) {
        fs.readFile(file, function (err, content) {
          if (err) return nextFile(err)
          content = content.toString()
          content = format(content, data)
          console.log('updating', file)
          fs.writeFile(file, content, nextFile)
        })
      }, function (err) {
        if (err) return done && done(err)
        done && done()
      })
    }

    console.log('searching for files...')
    glob.create([path.join(process.cwd(), "**/*.*"), '!node_modules/**', '!build/**', '!upgrades/**', '!.git/**'])
      .on('data', function (file) {
        files.push(file.path)
      })
      .on('end', function () {
        console.log('scanning for placeholders...')
        scanPlaceholders(files, function (err, placeholders, filesWithPlaceholders) {
          console.log('found', filesWithPlaceholders.length, 'files')
          if (filesWithPlaceholders.length === 0) return
          inquirer.prompt(createAnswers(placeholders), function (answers) {
            console.log('updating files...')
            updateFiles(filesWithPlaceholders, answers, function (err) {
              if (err) {
                console.error(err)
                return process.exit(1)
              }
              console.log('all done')
              process.exit(0)
            })
          })
        })
      })
  })
}
