var mongoose = require("mongoose"),
  passport = require('passport'),
  keystone = require('keystone'),
  User = keystone.list('User').model,
  LocalStrategy = require('passport-local').Strategy;

// var uri = "mongodb://localhost:27017/dollhouse";
// var db = mongoose.createConnection(uri);

// passportLocalMongoose adds these functions to User I think
// use static authenticate method of model in LocalStrategy

// passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("This is the Passport authentication strategy");
    console.log("Username: %s Password: %s", username, password);
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      user._.password.compare(password, function(err, isMatch) {
        if (!err && isMatch) {
          return done(null, user);
        }
        else {
          return done(null, false, { message: 'Incorrect password.' });

        }
      });

      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      // return done(null, user);
    });
  }
));



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


// module.exports = {
//
//   // create new account
//
//   // make sure an ordinary user is logged in
//
//   // log someone in
//
// };


// From Keystone
// Setting Cookies

/**
 * Creates a hash of str with Keystone's cookie secret.
 * Only hashes the first half of the string.
 */

// var hash = function(str) {
// 	// force type
// 	str = '' + str;
// 	// get the first half
// 	str = str.substr(0, Math.round(str.length / 2));
// 	// hash using sha256
// 	return crypto
// 		.createHmac('sha256', keystone.get('cookie secret'))
// 		.update(str)
// 		.digest('base64')
// 		.replace(/\=+$/, '');
// };


// if (keystone.get('cookie signin') && user.password) {
//   var userToken = user.id + ':' + hash(user.password);
//   res.cookie('keystone.uid', userToken, { signed: true, httpOnly: true });
// }
