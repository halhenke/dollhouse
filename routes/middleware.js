/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('lodash'),
    keystone = require('keystone'),
    config = require('../config');


/**
  Initialises the standard view locals

  The included layout depends on the navLinks array to generate
  the navigation in the header, you may wish to change this array
  or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

  var locals = res.locals;

  locals.navLinks = [
    { label: 'Home',		key: 'home',		href: '/' },
    { label: 'Updates',		key: 'blog',		href: '/blog' },
    { label: 'Events',		key: 'events',		href: '/events' },
    { label: 'Gallery',		key: 'gallery',		href: '/gallery' },
    { label: 'Community', dropdowns: [
      { label: 'Doll Database',   key: 'dolls',   href: '/community/#/dolls' },
      { label: 'Our Members',   key: 'users',   href: '/community/#/profiles' },
      { label: 'Our Links',   key: 'links',   href: '/community/#/links' },
      { label: 'Our Events',   key: 'calendar',   href: '/community/#/calendar' },
    ] },
    { label: 'Forum',		key: 'forum',		href: config.forumRoute },
    { label: 'About Us',		key: 'about',		href: '/about' },
    { label: 'Contact',		key: 'contact',		href: '/contact' }
  ];

  locals.user = req.user;

  next();

};


/**
  Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

  next();

};


/**
  Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }
};


/**
 * Attempt at a custom user/session authentication function...
 */

exports.passportUserCheck = function (req, res, next) {
  if (req.session && req.session.passport && req.session.passport.user) {
      console.log("Session is storing User ID: " + req.session.passport.user);
      keystone.list('User').model.findById(req.session.passport.user)
        .exec(function (err, user) {
          if (!err) {
            console.log("Found our user - name is " + user.name.full);
            req.user = user;
          }
          next();
        });
  }
  else {
    console.log("Nothing found!");
    // console.dir(req.session.cookie);
    next();
  }
};


exports.logHeaders = function(req, res, next) {
  console.log('Request Headers');
  console.log(req.headers);
  console.log('Response Headers');
  console.log(res.headers);
  console.log("User is " + (req.user ? "": "not ") + "logged in");
  console.log("Req.user is ");
  console.dir(req.user);
  console.log("Cookies are ");
  console.dir(req.cookies);
  console.log("Signed Cookies are ");
  console.dir(req.signedCookies);
  console.log("Keystone Cookie says %s", req.signedCookies["keystone.sid"]);
  console.log("Session is ");
  console.dir(req.session);

  next();
};
