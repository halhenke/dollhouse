var mongoose = require("mongoose"),
    passport = require('passport'),
    keystone = require('keystone'),
    User = keystone.list('User').model,
    TokenStrategy   = require('passport-token').Strategy;

// var uri = "mongodb://localhost:27017/dollhouse";
// var db = mongoose.createConnection(uri);

// passportLocalMongoose adds these functions to User I think
// use static authenticate method of model in LocalStrategy

// var strategyOptions = {
//   usernameHeader: 'x-custom-username',
//   tokenHeader:    'x-custom-token',
//   usernameField:  'custom-username',
//   tokenField:     'custom-token'
// };

// var strategy = new TokenStrategy(strategyOptions, function (username, token, done) {
var strategy = new TokenStrategy(function (username, token, done) {
    console.log("Passport TokenStrategy called!!!");
    console.log("Passport username: " + username + " token: " + token);
    // User.findOne({username: username}, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false);
    //   }
    //   if (!user.verifyToken(token)) {
    //     return done(null, false);
    //   }
    //   return done(null, user);
    // });
    console.log("Fake authenticate!!!");
    return done(null, {})
  });

console.log("Middleware token file run...");

// passport.use(new TokenStrategy(strategyOptions,
//   function (username, token, done) {
//     console.log("Passport TokenStrategy called!!!");
//     console.log("Passport username: " + username + " token: " + token);
//     User.findOne({username: username}, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyToken(token)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   }));

function authenticate(req, res, next) {
  console.log("passport token authenticate Called");
  passport.authenticate('token', function (err, user, info) {
    if (err) {
      console.log("passport token: error " + err);
      return next(err);
    }
    if (!user) {
      console.log("passport token: user not found");
      return res.status(401).json({message: "Incorrect token credentials"});
    }
    console.log("passport token: user found");
    req.user = user;
    next();
  });
  console.log("passport token: at the end");
}

// use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function(user, cb) {
    // cb(null, user.get(options.usernameField));
    // cb(null, user.get("email"));
    cb(null, user.id);
});

passport.deserializeUser(function(userID, cb) {
    User.findById(userID, cb);
});

module.exports = {
  passport: passport,
  strategy: strategy,
  authenticate: authenticate
};
