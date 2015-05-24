var mongoose = require("mongoose"),
  // passport = require('passport'),
  keystone = require('keystone'),
  User = keystone.list('User');
  // LocalStrategy = require('passport-local').Strategy;

// var uri = "mongodb://localhost:27017/dollhouse";
// var db = mongoose.createConnection(uri);


module.exports = function (req, res) {
  var view = new keystone.View(req, res),
      locals = res.locals;

  // Set locals
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.userRegistered = false;

  view.on('post', function(next) {
    // var newUser = new User.model({
    //   email: locals.formData.email,
    //   name: {
    //     first: locals.formData.name.first,
    //     last: locals.formData.name.last
    //   },
    //   password: locals.formData.password
    // });
    // console.log("BRANCH 2.0.1");
    // newUser.save()
    //   .then(function () {
    //     console.log("BRANCH 2.0.2");
    //     next();
    //   },function (err) {
    //     console.log("BRANCH 2.0.3");
    //     locals.validationErrors = err.errors;
    //     next();
    //   });

      // console.log('User Image body: ');
      // console.dir(req.body);
      // console.log('User Image params: ');
      // console.dir(req.params);

      // Check to see if user email exists
      User.model.find()
        .where({email: locals.formData.email})
        .exec()
        .then(function (users) {
          if (users && users.length) {
            console.log("BRANCH 1");
            req.flash('error', 'This email address is already in use');
            locals.validationErrors.email = true;
            next();
          }
          else {
            console.log("BRANCH 2");
            console.dir(locals.formData);
            console.dir(req.body);
            // var newUser = new User.model();
            var newUser = new User.model({
              email: locals.formData.email,
              name: {
                first: locals.formData['name.first'],
                last: locals.formData['name.last']
              },
              profile: {
                userName: locals.formData['profile.userName']
              },
              password: locals.formData.password
            });
            console.log("BRANCH 2.1");
            newUser.save(function (err) {
              if (err) {
                req.flash('error', 'There was a problem submitting your registration');
                console.log("BRANCH 2.2");
                locals.validationErrors = err.errors;
              }
              else {
                console.log("BRANCH 2.3");
                locals.userRegistered = true;
              }
              next();
            });
          }


            // })
              // .then(function () {
              //   console.log("BRANCH 2.2");
              //   next();
              // },function (err) {
              //   console.log("BRANCH 2.3");
              //   locals.validationErrors = err.errors;
              //   next();
              // });

            // newUser
            //   .getUpdateHandler(req, res)
            //   .process(req.body, {
            //     flashErrors: true,
            //     fields: 'email, password, name.first, name.last',
            //     errorMessage: 'Hmmmm: Your registration was not succesful...'
            //   }, function(err) {
            //     if (err) {
            //       console.log("BRANCH 3");
            //       locals.validationErrors = err.errors;
            //     } else {
            //       console.log("BRANCH 4");
            //       locals.userRegistered = true;
            //     }
            //     next();
            //   });
            // }
        }, function (err) {
          console.log("BRANCH 5");
          locals.validationErrors = err.errors;
          next();
        });

    });

  // view.render('passport/register');
  view.render(function (err, req, res) {
    if (req.method === 'POST' && res.locals.userRegistered) {
      // Callback?
      console.log("BRANCH 6");
      req.login();
      res.redirect('/');
    }
    else {
      console.log("BRANCH 7");
      res.render('passport/register');
    }
  });

};
