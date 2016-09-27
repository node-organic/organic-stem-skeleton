module.exports = function (plasma, dna) {
  plasma.i18n = {
    dictionary: {},
    lang: dna.defaultLang,
    init: function (lang) {
      this.lang = lang || dna.defaultLang
      return fetch(dna.endpoint + '?lang=' + this.lang, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).then((response) => response.json()).then((json) => {
        this.dictionary = json
      })
    },
    get: function (value) {
      if (!value) return ''
      if (typeof this.dictionary[value] !== 'undefined' && this.dictionary[value]) {
        return this.dictionary[value]
      } else {
        if (dna.saveMissing && typeof this.dictionary[value] === 'undefined') {
          fetch(dna.endpoint, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lang: this.lang,
              key: value
            })
          })
        }
      }
      return value
    }
  }
}
