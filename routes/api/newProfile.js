var keystone = require('keystone'),
      config = require('../../config'),
      Profile = keystone.list('Profile');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'profiles';
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.profiles = config.profiles
  locals.profileSubmitted = false;


  view.on('post', function(next) {
      var newProfile = new Profile.model({ owner: req.user });
      newProfile
        .getUpdateHandler(req, res)
        .process(req.body, {
          flashErrors: true,
          fields: "",
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
    else
      // res.send(locals.formData);
      res.send(locals);
  });

};
