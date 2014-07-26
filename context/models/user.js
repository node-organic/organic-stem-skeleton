var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

// create a user model
var schema = new mongoose.Schema({
  oauthID: Number,
  displayName: String,
  created: Date,
  refreshToken: String,
  role: {type: String, default: "user"}
});

schema.plugin(passportLocalMongoose);

schema.static("findByOAuthIDOrCreate", function(accessToken, refreshToken, profile, done) {
  var self = this
  this.findOne({ oauthID: profile.id }, function(err, user) {
    if(err) return done(err)
    if (!err && user != null) return done(null, user)

    self.create({
      oauthID: profile.id,
      displayName: profile.displayName,
      created: Date.now(),
      refreshToken: refreshToken
    }, done)
  })
})

module.exports = mongoose.model('User', schema);