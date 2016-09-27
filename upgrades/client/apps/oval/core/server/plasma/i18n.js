var path = require('path')
var fs = require('fs')
var format = require('string-template')

module.exports = function (plasma, dna) {
  var flush_to_disk = false
  var dicts = {}

  var loadDicts = function () {
    for (var i = 0; i < dna.langs.length; i++) {
      var dict_path = path.join(process.cwd(), dna.root, dna.langs[i] + '.json')
      try {
        dicts[dna.langs[i]] = JSON.parse(fs.readFileSync(dict_path, 'utf-8'))
        if (dna.log) {
          console.info('[i18n] loaded dictionary ' + dna.langs[i] + ' -> ' + dict_path)
        }
      } catch (e) {
        if (dna.log) {
          console.warn('[i18n] failed to load dictionary ' + dna.langs[i] + ' -> ' + dict_path, e)
        }
      }
    }
  }

  var saveMissing = function (c) {
    if (typeof dicts[c.lang][c.key] === 'undefined') {
      dicts[c.lang][c.key] = ''
    }
    for (var i = 0; i < dna.langs.length; i++) {
      if (dna.langs[i] === c.lang) continue
      if (typeof dicts[dna.langs[i]][c.key] === 'undefined') {
        dicts[dna.langs[i]][c.key] = ''
      }
    }
    flush_to_disk = true
  }

  if (dna.saveMissing) {
    var watch = require('nodewatch')
    for (var i = 0; i < dna.langs.length; i++) {
      var dict_path = path.join(dna.root, dna.langs[i] + '.json')
      watch.add(dict_path)
    }
    watch.onChange(function (dict_path) {
      if (flush_to_disk) return
      loadDicts()
    })
    var intervalID = setInterval(function () {
      if (flush_to_disk) {
        for (var i = 0; i < dna.langs.length; i++) {
          var lang = dna.langs[i]
          var dict_path = path.join(dna.root, lang + '.json')
          fs.writeFileSync(dict_path, JSON.stringify(dicts[lang], null, 2))
        }
        flush_to_disk = false
      }
    }, 1000)
  }

  plasma.on('kill', function () {
    clearInterval(intervalID)
  })

  plasma.on('i18n/save-missing', saveMissing)

  plasma.on('i18n/dict', function (c, done) {
    done(dicts[c.lang])
  })

  plasma.t = function (key, placeholders) {
    if (typeof dicts[dna.defaultLang][key] !== 'undefined' && dicts[dna.defaultLang][key]) {
      return format(dicts[dna.defaultLang][key], placeholders)
    } else {
      if (dna.saveMissing) {
        saveMissing({
          lang: dna.defaultLang,
          key: key
        })
      }
    }
    return key
  }

  plasma.tLocalized = function (lang) {
    return function (key, placeholders) {
      if (typeof dicts[lang][key] !== 'undefined' && dicts[dna.defaultLang][key]) {
        return format(dicts[lang][key], placeholders)
      } else {
        if (dna.saveMissing) {
          saveMissing({
            lang: lang,
            key: key
          })
        }
      }
      return key
    }
  }

  loadDicts()
}
