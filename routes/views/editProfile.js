var keystone = require('keystone'),
    Profile = keystone.list('User');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'profiles';
  locals.filters = {
    profile: req.params.profile
  };
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.profileUpdated = false;
  locals.data = {
  };

  // Load the current profile
  view.on('init', function(next) {

    var q = Profile
      .model.findOne({
        // any other conditions that need to be met
        slug: locals.filters.profile
      });
      // Use this if you need to populate any related Fields
      // }).populate('...');

    q.exec(function(err, result) {
      locals.data.profile = result;
      next(err);
    });

  });

  view.on('post', function(next) {
      // var newProfile = new Profile.model({ owner: req.user });
      locals.data.profile
        .getUpdateHandler(req, res)
        .process(req.body, {
          flashErrors: true,
          fields: "name, profile.userName, profile.emailShow, profile.avatar, profile.about.brief, profile.about.extended",
          errorMessage: 'Hmmmm: There was a problem updating your profile...'
        }, function(err) {
          if (err) {
            locals.validationErrors = err.errors;
          } else {
            locals.profileUpdated = true;
          }
          next();
        });

    });

  view.render(function (err, req, res) {
    if (req.method === 'POST' && res.locals.profileUpdated) {
      // res.redirect('profiles');
      res.redirect("/community/#/profiles/profile/" + locals.data.profile.slug);
    }
    else
      res.render('profiles/edit');
  });

};
