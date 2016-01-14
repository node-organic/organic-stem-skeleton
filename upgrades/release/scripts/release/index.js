module.exports = function (angel) {
  angel.on('release:setup', function (angel) {
    require('angelabilities-exec')(angel)
    var child = angel.sh([
      'git checkout -b develop',
      'git checkout -b staging',
      'git push',
      'git checkout develop'
    ].join(' && '), function (err) {
      process.stdin.unpipe(child.stdin)
      process.stdin.end()
      if (err) {
        console.error(err)
        return process.exit(1)
      } else {
        process.exit(0)
      }
    })
    process.stdin.resume()
    process.stdin.pipe(child.stdin)
  })

  angel.on('release production', function (angel) {
    require('angelabilities-exec')(angel)
    var child = angel.sh([
      'git checkout develop',
      'git push origin develop',
      'git pull origin develop',
      'git checkout master',
      'git merge staging',
      'git push origin master',
      'git checkout develop',
      'node ./node_modules/.bin/angel cell upgrade ./dna/_production/cell.json'
    ].join(' && '), function (err) {
      process.stdin.unpipe(child.stdin)
      process.stdin.end()
      if (err) {
        console.error(err)
        return process.exit(1)
      } else {
        process.exit(0)
      }
    })
    process.stdin.resume()
    process.stdin.pipe(child.stdin)
  })

  angel.on('release staging', function (angel) {
    require('angelabilities-exec')(angel)
    var child = angel.sh([
      'npm run test:style',
      'git checkout develop',
      'git push origin develop',
      'git pull origin develop',
      'npm version patch',
      'git push --tags origin develop',
      'git checkout staging',
      'git pull origin staging',
      'git merge develop',
      'git push origin staging',
      'git checkout develop',
      'node ./node_modules/.bin/angel cell upgrade ./dna/_staging/cell.json'
    ].join(' && '), function (err) {
      process.stdin.unpipe(child.stdin)
      process.stdin.end()
      if (err) {
        console.error(err)
        return process.exit(1)
      } else {
        process.exit(0)
      }
    })
    process.stdin.resume()
    process.stdin.pipe(child.stdin)
  })
}
