module.exports = function (pagePath) {
  if (pagePath.indexOf('/') !== 0) {
    pagePath = '/' + pagePath
  }
  window.location = pagePath
}
