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
  importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.logHeaders);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {

  // Views
  app.get('/', routes.views.index);
  // app.get('/', routes.views.index_ng);
  app.get('/blog/:category?', routes.views.blog);
  app.get('/blog/post/:post', routes.views.post);
  app.get('/gallery', routes.views.gallery);
  app.get('/events', routes.views.events);
  app.get('/events/event/:event', routes.views.event);
  app.get('/community', routes.views.dolls);
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

  // app.get('/profiles', routes.views.indexProfiles)
  app.all('/profiles/new', routes.views.newProfile)
  // app.get('/profiles/profile:profile', routes.views.showProfile)
  // app.get('/profiles/profile/:profile/edit', routes.views.editProfile)
  // app.get('/profiles/profile/:profile/delete', routes.views.deleteProfile)

  app.all('/dolls/new', routes.views.newDoll);
  app.get('/about', routes.views.about);
  app.all('/contact', routes.views.contact);

  // Enable Bower directory as static directory
  // - maybe change later - move bower components to public/


  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);

};
