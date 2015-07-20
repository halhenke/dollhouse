/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone'),
    middleware = require('./middleware'),
    jwt = require('express-jwt'),
    jWebTok = require('jsonwebtoken'),
    passport = require('passport'),
    // passportMiddleware = require('./passport/middleware'),
    // passportTokenMiddleware = require('./passport/middleware-token'),
    importRoutes = keystone.importer(__dirname);

// Common Middleware

// keystone.pre('routes', middleware.passportUserCheck);

// keystone.pre('routes', passportTokenMiddleware.authenticate);
keystone.pre('routes', jwt({
  secret: process.env.TOKEN_SECRET,
  // audience: 'superUsers',
  issuer: 'dollsocial.club',
  getToken: middleware.myTokenRetrieval
}));
// Bit tortured - req.user is now the decoded token
// need to set it to user
keystone.pre('routes', middleware.tokenToUser);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Log a bunch of stuff if we are in development mode
if (keystone.get('env') == 'development') {
  keystone.pre('render', middleware.logHeaders);
}

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api'),
  passport: importRoutes('./passport')
};

// Setup Route Bindings
exports = module.exports = function(app) {

  // SEARCH - FOR NOW
  app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
  });

  // NOTE: DISABLE PASSPORT
  // PASSPORT - has to be set first..?
  // app.use(passport.initialize());
  // app.use(passport.session());
  // - passport related login/logout etc
  // app.post('/users/login',
  //   passport.authenticate('local', { successRedirect: '/',
  //                                    failureRedirect: '/users/login',
  //                                    failureFlash: true })
  // );
  app.get('/users/login', routes.passport.login);
  // LOGIN -> TOKEN
  app.post('/users/login', middleware.myTokenAuthentication);
  app.all('/users/register', routes.passport.register);
  app.get('/users/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  // PROTECT THE COMMUNITY PAGE
  app.use('/community',
    jwt({
      secret: process.env.TOKEN_SECRET,
      // audience: 'superUsers',
      issuer: 'dollsocial.club',
      // getToken: tokenFromCookie(req)
      getToken: middleware.myTokenRetrieval
    }));

  // Views
  app.get('/', routes.views.home);
  // app.get('/', routes.views.index);
  // app.get('/', routes.views.index_ng);
  app.get('/blog/:category?', routes.views.blog);
  app.get('/blog/post/:post', routes.views.post);
  app.get('/gallery', routes.views.gallery);
  app.get('/events', routes.views.events);
  app.get('/events/event/:event', routes.views.event);
  app.get('/community', routes.views.community);
  app.get('/api/links', routes.api.links);
  app.get('/api/dolls', routes.api.dolls);
  app.get('/api/dolls/show/:doll', routes.api.showDoll);
  app.get('/dolls/doll/:doll', routes.views.dollView);
  app.get('/api/profiles', routes.api.profiles);
  app.get('/api/profiles/show/:profile', routes.api.showProfile);
  app.get('/users', routes.views.profiles);
  app.get('/profiles', routes.views.profiles);
  app.get('/profiles/show/:profile', routes.views.profileView);
  app.get('/users/show/:profile', routes.views.profileView);
  // USERS
  // app.get('/api/users', routes.api.indexUsers);
  // app.all('/api/users/new', routes.api.newUser);
  // app.get('/api/users/user:user', routes.api.showUser);
  // app.put('/api/users/user/:user/edit', routes.api.editUser);
  // app.put('/api/users/user/:user/delete', routes.api.deleteUser);
  // app.get('/users', routes.views.indexUsers);
  // app.all('/users/new', routes.views.newUser);
  // app.get('/users/user:user', routes.views.showUser);
  // app.put('/users/user/:user/edit', routes.views.editUser);
  // app.put('/users/user/:user/delete', routes.views.deleteUser);

  // app.get('/profiles', routes.views.indexProfiles);
  app.all('/profiles/new', routes.views.newProfile);
  // app.get('/profiles/profile:profile', routes.views.showProfile);
  app.all('/profiles/profile/:profile/edit', routes.views.editProfile);
  // app.get('/profiles/profile/:profile/delete', routes.views.deleteProfile);

  app.all('/dolls/new', routes.views.newDoll);
  // app.get('/dolls/doll/:doll/edit', routes.views.editDoll);
  app.all('/dolls/doll/:doll/edit', routes.views.editDoll);
  app.get('/about', routes.views.about);
  app.all('/contact', routes.views.contact);

  // Enable Bower directory as static directory
  // - maybe change later - move bower components to public/


  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);

  // ERROR HANDLING
  // TOKEN RELATED
  app.use(function (err, req, res, next) {
    console.log("Err Catching middleware called...");
    if (err.name === "UnauthorizedError") {
      console.log("We seem to have been kicked out by express-jwt");
      // res.location('/');
      // NOTE: This leaves relative Angular HashLink
      // stuff appended to the root location
      next();
      // res.redirect('/');
    } else {
      next();
    }
  });

};
