var keystone = require('keystone'),
      config = require('../../config'),
      Profile = keystone.list('Profile'),
      User = keystone.list('User');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'profiles';
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.profileSubmitted = false;

  view.on('init', function(next) {
    User.model.find()
      .exec(function(err, results) {        
        locals.users = results;
        next(err);
      });
  });

  view.on('post', function(next) {
      var newProfile = new Profile.model({ user: req.user });
      newProfile
        .getUpdateHandler(req, res)
        .process(req.body, {
          flashErrors: true,
          fields: "userName, user, state, avatar, about.brief",
          // fields: "owner, state, userName, emailShow, location_show, avatar, about",
          errorMessage: 'Hmmmm: There was a problem submitting your profile...'
        }, function(err) {
          if (err) {
            locals.validationErrors = err.errors;
          } else {
            locals.profileSubmitted = true;
          }
          next();
        });

    });

  view.render(function (err, req, res) {
    if (req.method === 'POST' && res.locals.profileSubmitted) {
      res.redirect('/profiles');
    }
    else {      
      console.log("Validation errors:");
      console.dir(locals.validationErrors);
      res.render('profiles/new');
    }
  });

};
