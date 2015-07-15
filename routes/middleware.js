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
    jwt = require('express-jwt'),
    jWebTok = require('jsonwebtoken'),
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
    { label: 'home',		key: 'home',		href: '/' },
    { label: 'updates',		key: 'blog',		href: '/blog' },
    { label: 'events',		key: 'events',		href: '/events' },
    { label: 'gallery',		key: 'gallery',		href: '/gallery' },
    { label: 'community', dropdowns: [
      { label: 'doll database',   key: 'dolls',   href: '/community/#/dolls' },
      { label: 'our members',   key: 'users',   href: '/community/#/profiles' },
      { label: 'our links',   key: 'links',   href: '/community/#/links' },
      { label: 'our events',   key: 'calendar',   href: '/community/#/calendar' },
    ] },
    { label: 'forums',		key: 'forums',		href: config.forumRoute },
    // { label: 'about us',		key: 'about',		href: '/about' },
    { label: 'contact',		key: 'contact',		href: '/contact' }
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
  Prevents people from accessing Admin Pages when we are using
  our custom role based strategy...
 */

exports.requireSuperUser = function(req, res, next) {
  if (!req.user || !req.user.isSuperUser) {
    req.flash('error', 'You must be an Admin to access this page.');
    res.redirect('/');
  } else {
    next();
  }
};

function slugUser (user, req, next) {
  console.log("slugUser called...user is ");
  console.log("user - email is " + user.email);
  console.log("user - slug is " + user.slug);
  if (user.slug == user.email) {
    user.save(function (err, user) {
      console.log("slugUser: user saved...");
      req.user = user;
      next();
    });
  }
  else {
    console.log("slugUser: no action...");
    req.user = user;
    next();
  }
}


/**
 * Attempt at a custom user/session authentication function...
 */

exports.passportUserCheck = function (req, res, next) {
  console.log("passportUserCheck function Called");
  if (req.session && req.session.passport
    && req.session.passport.user) {
      console.log("Session is storing User ID: " + req.session.passport.user);
      keystone.list('User')
        .model.findById(req.session.passport.user)
        .exec(function (err, user) {
          if (!err && user) {
            console.log("Found our user - name is " + user.name.full);
            slugUser(user, req, next);
            // req.user = user;
          }
          else
            next();
        });
  }
  else {
    console.log("Nothing found!");
    // console.dir(req.session.cookie);
    next();
  }
};

// ----------------------------------------------
// TOKEN RELATED AUTHENTICATION AND ACCESS
// ----------------------------------------------
// Called on login
// - store token in either
//   - header
//   - body
//   - cookie
//   - localStorage/sessionStorage
exports.myTokenAuthentication = function (req, res, next) {
  console.log("Looking for a user....");
  keystone.list('User').model
    .findOne({"email": req.body.username})
    .exec()
    .then(function (user) {
      console.log("Inside user findOne....");
      if (user) {
        user._.password.compare(req.body.password, function (err, result) {
          if (err || (! result)) {
            console.log("User password did not match");
            res.redirect('/');
          }
          else {
            console.log("User passwords matched");
            var tok = jWebTok.sign({userSlug: user.slug},
                      process.env.TOKEN_SECRET, {
                        audience: 'superUsers',
                        issuer: 'dollsocial.club'
                      });
            console.log("Token created!");
            // token in cookie
            res.cookie('tok', tok, {
                secure: true,
                signed: true
            });
            // // token in header
            // res.setHeader("Authorization", "Bearer " + tok);
            // res.send("Happy Failure");
            res.redirect('/');
          }
        })
      } else {
        res.redirect('/');
      }
    },
    function (err) {
      console.log("User findOne got err: " + err);
      res.redirect('/');
    })
  };

exports.myTokenRetrieval = function (req) {
  console.log("getToken called");
  // console.log("Req cookies are");
  // console.dir(req.cookies);
  // if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //     return req.headers.authorization.split(' ')[1];
  // } else if (req.query && req.query.token) {
  //   return req.query.token;
  // }
  // NOTE: Because we signed the cookie it wont be in
  // req.cookie
  if (req.signedCookies.tok) {
    console.log("tok coookie found");
    return req.signedCookies.tok;
  } else {
    console.log("tok coookie not found");
    return null;
  }
};
// ----------------------------------------------

exports.logHeaders = function(req, res, next) {
  console.log('Request Headers');
  console.log('Keystone is running in ' + keystone.get('env') + ' mode');
  console.log('Keystone is running on host: ' + keystone.get('host')
    + ' port: ' + keystone.get('host'));
  // console.log('Cookie Secret is ' + process.env.COOKIE_SECRET);
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
