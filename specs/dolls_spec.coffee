request = require "request"
lo = require "lodash"
jar = request.jar()
jsdom = require "jsdom"
sinon = require "sinon"
mockery = require "mockery"
proxyquire = require "proxyquire"
{ expect, should, Should, assert } = require 'chai'

dollFixtures = require "./fixtures/dolls.coffee"
userFixtures = require "./fixtures/users.coffee"

tokenFetch = (cookie) ->
  token = lo.filter(cookie, (val, key) ->
  # token = lo.filter(lo.values(cookie), (val, key) ->
      return val.match(/XSRF-TOKEN/))
  return lo.first(token).match(/XSRF-TOKEN=(.\S*)/)[1]

setupTestServer = (done) ->
  # Either:
  # - start keystone as according to
  # - ./keystone.js file
  # - replace keystone.mongo
  # Or
  # - node keystoneTest
  # spawn - NOT REALLY WORKING OUT
  # spawn = require('child_process').spawn
  # # keystoneTest = fork "node", ["keystoneTest.js"],
  # # fork = require('child_process').fork
  # # @keystone = fork "dollhouse", ["../keystoneTest.js"],
  # @keystone = spawn "node", ["../keystoneTest.js"],
  #   cwd: "../"
  #   detached: true
  # # @keystone.unref()
  require('dotenv').load();
  
  keystone = require "keystone"
  keystone.init
    'name': 'dollhouse-test'
    'brand': 'the dollhouse'
    'port': 4500
    'sass': '../public'
    'static': '../public'
    'favicon': '../public/favicon.ico'
    'views': '../templates/views'
    'view engine': 'jade'
    'emails': '../templates/emails'
    # 'auto update': true
    'session': true
    'auth': true
    # 'auth': false
    # 'session': false
    'user model': 'User'
    'cookie secret': 'vAC=8h_#vl!SpFi&m1)_qFR@"nw9vRDT+/Q+&3-rc4+:D,bg_|"0I8wiRF-8tI|='
  keystone.import '../models'


  valiStub = sinon.stub(keystone.security.csrf, "validate", ->
    console.log "Validate stub called"
    return true
    )
  # sessionStub = sinon.stub(keystone.session, "signin").callsArg(4)
  console.log "Finding admin user 1: " + Object.keys(keystone.list('User').model.findOne(email: userFixtures.adminGuy.email))
  console.log "Fiding admin user: 3: " + Object.keys(keystone.list('User').model.find().where
      email: userFixtures.adminGuy.email
    .exec())
  keystone.list('User').model.find().where
      email: userFixtures.adminGuy.email
    .exec (err, results) ->
      console.log "Finding admin user 2: " + Object.keys(results)
  # sessionStub = sinon.stub(keystone.session, "signin").callsArgWith 3,
  #   keystone.list('User').model.findOne email: userFixtures.adminGuy.email

  # PROXYQUIRE DOESNT SEEM TO BE NEEDED
  # signIN = require "../node_modules/keystone/routes/views/signin.js"
  # signIN = proxyquire "../node_modules/keystone/routes/views/signin.js",
  #   # "../../": valiStub
  #   "../../index.js": valiStub
  #   "keystone": valiStub
  #   # "../../lib/session": sessionStub

  # keystone.security.csrf = valiStub
  # keystone.security.csrf.validate = ->
  #   console.log "This other Validate stub called"
  #   return true

  # keystone = proxyquire "../node_modules/keystone/index.js",
  # keystone = proxyquire "keystone",
  #   './lib/security/csrf': valiStub


  # --------------------------------------------------------
  # ROUTES
  # --------------------------------------------------------
  keystone.set('routes', require('../routes'))
  # keystone.set 'routes', (app) ->
  #   app.all('signinTest', signIN)
  #   return require('../routes')
  # keystone.app.post('/keystone/signinTest', signIN)

  # middleware = require('../routes/middleware')
  # # importRoutes = keystone.importer(__dirname)
  # importRoutes = keystone.importer(__dirname + "/../routes/")
  # # Common Middleware
  # keystone.pre 'routes', middleware.initLocals
  # keystone.pre 'render', middleware.flashMessages
  # keystone.pre 'render', middleware.logHeaders
  # # Import Route Controllers
  # routes =
  #   views: importRoutes('./views')
  #   api: importRoutes('./api')
  # keystone.set 'routes', (app) ->
  #   app.get('/dolls', routes.views.dolls)
  #   # app.all('/keystone/signinTest', signIN)
  #   app.all('/signinTest', require("../node_modules/keystone/routes/views/signin.js"))



  keystone.set('email tests', require('../routes/emails'))
  # need to set cloudinary because we have models that use it?
  keystone.set 'cloudinary config',
    cloud_name: 'my-cloud'
    api_key: 'abc'
    api_secret: '123'

  # mockery.registerMock "keystone", keystone
  # debugger
  # keystone.set('signin url', '/keystone/signin')

  # keystone.app.all('/signinTest', signIN)
  # keystone.app.all('/signinTest', require("../node_modules/keystone/routes/views/signin.js"))

    # console.log "la la la")
  # keystone.app.all('/keystone/signin', ->
  # # keystone.set('/routes', ->
  #   console.log "la la la")


  keystone.start ->
    keystone.httpServer.on 'connection', () ->
      console.log "keystone TEST SERVER - connection made"

  keystone.app.all('/signinTest', require("../node_modules/keystone/routes/views/signin.js"))
  # keystone.app.post('/keystone/signinTest', signIN)

  console.log "keystone Test Server nominally started..."
  keystone.console = console

  # We need to wait for server to initialise...
  @keystone = keystone
  @mongoose = keystone.mongoose
  # Clear database first
  @keystone.list('User').model.remove().exec ->
    console.log "Users deleted from Test DB..."
  @keystone.list('Doll').model.remove().exec ->
    console.log "Dolls deleted from Test DB..."
  # console.log "Managed to drop Dolls: " + @mongoose.db.dolls.drop()
  @mongoose.connection.collections.dolls.drop ->
    console.log "Managed to drop Dolls completely..."
  dataCreate(keystone, mongoose, done)


dataCreate = (keystone, mongoose, done) ->
  keystone.list('User').model.create userFixtures.adminGuy, (err, ...) ->
    if err
      console.log "Problem saving users: #{err}"
    else
      console.log "Users saved!"
  keystone.list('Doll').model.create dollFixtures.dollList.dolls, (err, ...) ->
    if err
      console.log "Problem saving dolls: #{err}"
    else
      console.log "Dolls saved!"
  setTimeout(done, 4000)

stopTestServer = ->
  @keystone.list('Doll').model.remove().exec ->
    console.log "Dolls deleted from Test DB..."
  # @keystone.httpServer.close()
  console.log "Keystone Test Server nominally stopped..."


# USING JSDOM    
describe "the site", ->
  this.timeout(20000)

  before (done) ->
    # @keystone = setupTestServer
    setupTestServer(done)
  after (done) ->
    stopTestServer()
    done()
  describe 'Views rendered on the server', ->
    it 'should be running', (done) ->
      console.log "It has begun..."
      jsdom.env
        url: "http://0.0.0.0:4500"
        headers:
          "Cache-Control": "no-cache"
          # pragma: 'no-cache'
          # "If-Modified-Since": "Sat, 29 Oct 1994 19:43:31 GMT"
        # scripts: "/js/lib/jquery/jquery-2.11.1.min.js"
        scripts: ["http://code.jquery.com/jquery.js"]
        done: (err, window) ->
          # console.log "window.status is #{window.status}"
          console.log "err is #{err}"
          # console.log "response statusCode is #{response.statusCode}"
          expect(err).to.be.null
          $ = window.$
          expect(err).to.be.null
          expect($("h1").text()).to.have.string "Welcome to The DollHouse"
          done()
    it.skip 'should return some dolls in JSON form', (done) ->
      this.timeout(15000)
      jsdom.env
        url: "http://0.0.0.0:3000/api/dolls"
        # url: "http://www.google.com"
        # url: "http://0.0.0.0:8080/"
        scripts: ["http://code.jquery.com/jquery.js"]
        headers:
          "Cache-Control": "no-cache"
          # pragma: 'no-cache'
        done: (err, window) ->
          $ = window.$
          console.log "err is #{err}"
          # console.log $('body pre').innerText
          console.log window.document.body.innerText
          # console.log "response is #{response}"
          # console.log "body is #{body}"
          expect(err).to.be.null
          # expect(response.statusCode).to.eql 200
          # expect(JSON.parse(window.document.body.innerText)).to.contain.keys "data"
          # expect(JSON.parse($('body').innerText)).to.contain.keys "data"
          # expect(window.document.body.data.dolls.length).to.be.at.least(10)
          # expect(window.document.body).to.contain.keys "data"
          # expect(window.document.body.data.dolls.length).to.be.at.least(10)
          done()


  # USING REQUEST
  describe "the Dolls API", ->
    it.skip 'should be running', (done) ->
      # request "http://0.0.0.0:3000", (err, response, body) ->
      # request "http://127.0.0.1:3000", (err, response, body) ->
      request "http://0.0.0.0:8080", (err, response, body) ->
        console.log "response is #{response}"
        # expect(err).to.be.null
        # expect(response.statusCode).to.eql 200
        expect(body).to.have.string "Welcome to The Dollhouse"
        # expect(body).to.have.string "Hunome"
        done()
    describe.only "when a user is logged in", ->
      # @timeout(10000)
      # csrf_token = ""
      # before (done) ->
      #   console.log "stubarama"
      #   request(
      #     url: "http://0.0.0.0:4500/signinTest"
      #     method: "GET"
      #     json: true
      #     jar: jar
      #     (err, response, body) ->
      #       # csrf_token = tokenFetch(response.headers['set-cookie'])

      #       # # console.log "Keys: " + Object.keys(JSON.parse(body))
      #       # # console.log "Keys: " + Object.keys(response.headers)
      #       # # console.log "Keys: " + response.headers['set-cookie']
      #       # console.log "Keys: " + (response.headers['set-cookie'])
      #       # console.log "Keys: " + (Object.keys response.headers['set-cookie'])
      #       # console.log "Keys: " + tokenFetch(response.headers['set-cookie'])
      #       console.log body
      #       console.log "JAR is "
      #       console.log jar
      #       done())

      it "should let us log in", (done) ->
        request(
          # url: "http://0.0.0.0:3000/keystone/signin"
          url: "http://0.0.0.0:4500/signinTest"
          method: "POST"
          json: true
          jar: jar
          body:
            email: userFixtures.adminGuy.email
            password: userFixtures.adminGuy.password
            # _csrf: csrf_token
          (err, response, body) ->
            expect(err).to.be.null
            # expect(response.statusCode).to.eql 200
            console.log("response.statusCode: " + response.statusCode)
            console.log body
            console.log "JAR is "
            console.log jar
            done())
      it "should show we are logged in", (done) ->
        request.get
          url: "http://0.0.0.0:4500/signinTest"
          json: true
          jar: jar
          # body:
          #   email: userFixtures.adminGuy.email
          #   password: userFixtures.adminGuy.password
          #   # _csrf: csrf_token
          (err, response, body) ->
            expect(err).to.be.null
            expect(response.statusCode).to.eql 200
            expect(body).to.include "You're already signed in."
            done()
      it 'should return some dolls in JSON form', (done) ->
        request "http://0.0.0.0:4500/api/dolls", (err, response, body) ->
          expect(err).to.be.null
          expect(response.statusCode).to.eql 200
          expect(JSON.parse(body)).to.contain.keys "dolls"
          expect(JSON.parse(body).dolls.length).to.be.at.least(10)
          done()
      describe "when considering ownership", ->
        before (done) ->
          console.log "BEFORE BEGIN!"
          # done()
          keystone.list('User').model
            .findOne email: userFixtures.adminGuy.email
            .exec (err, result) ->
              console.log "Found user"
              if err
                console.log "we had err: #{err}"
              else
                console.log "result length: #{result}"
              keystone.list('Doll').model
                .find(state: "private").limit(4)
                .update {owner: result.id}, ->
                  console.log "Dols updated"
                  done()
        it "should return all of a users dolls even if they are not public", (done) ->
          console.log "DOLL TEST 4: go"
          request.get
            url: "http://0.0.0.0:4500/api/dolls"
            jar: jar
            (err, response, body) ->
              console.log "DOLL TEST 4: called"
              expect(err).to.be.null
              expect(response.statusCode).to.eql 200
              expect(JSON.parse(body)).to.contain.keys "dolls"
              expect(JSON.parse(body).dolls.length).to.equal(11)
              done()        
        it "should not return dolls from other users that are not public"
