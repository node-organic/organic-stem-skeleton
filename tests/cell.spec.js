var helpers = require("./helpers")
var request = require("request")
var exec = require('child_process').exec

describe("cell", function(){
  it("master starts", helpers.start)
  it("api reacts", function(next){
    request({
      uri: helpers.httpendpoint+"/api/version"
    }, function(err, res, body){
      expect(body).toBe('"0.0.0"')
      next()
    })
  })
  it("site reacts", function(next){
    request({
      uri: helpers.httpendpoint+"/"
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      next()
    })
  })
  it("not found reacts", function(next){
    request({
      uri: helpers.httpendpoint+"/notfound"+(new Date()).getTime().toString()
    }, function(err, res, body){
      expect(res.statusCode).toBe(404)
      next()
    })
  })
  it("public assets reacts", function(next){
    request({
      uri: helpers.httpendpoint+"/public/organic.txt"
    }, function(err, res, body){
      expect(body).toContain("stem 0.0.0")
      next()
    })
  })
  it("master stops", helpers.stop)
  it("builds app", function(next){
    exec("node ./node_modules/.bin/angel build", function(err, stderr, stdout){
      expect(err).toBeFalsy()
      expect(stderr).toBe('')
      expect(stdout).toBe('')
      next()
    })
  })
})