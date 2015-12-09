var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
var sendmailTransport = require('nodemailer-sendmail-transport')

module.exports = function (options) {
  switch (options.type) {
    case 'smtp': return nodemailer.createTransport(smtpTransport(options))
    case 'sendmail': return nodemailer.createTransport(sendmailTransport(options))
    default: throw new Error(options.type + ' is not found transport type')
  }
}
