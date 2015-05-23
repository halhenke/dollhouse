var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'users';
  locals.filters = {
    user: req.params.user
  };
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.userUpdated = false;
  locals.data = {
  };

  // Load the current user
  view.on('init', function(next) {

    var q = keystone.list('User')
      .model.findOne({
        // any other conditions that need to be met
        slug: locals.filters.user
      });
      // Use this if you need to populate any related Fields
      // }).populate('...');

    q.exec(function(err, result) {
      locals.data.user = result;
      next(err);
    });

  });

  view.on('post', function(next) {
      // var newUser = new User.model({ owner: req.user });
      locals.data.user
        .getUpdateHandler(req, res)
        .process(req.body, {
          flashErrors: true,
          fields: "",
          errorMessage: 'Hmmmm: There was a problem updating your user...'
        }, function(err) {
          if (err) {
            locals.validationErrors = err.errors;
          } else {
            locals.userUpdated = true;
          }
          next();
        });

    });

  view.render(function (err, req, res) {
    if (req.method === 'POST' && res.locals.userUpdated) {
      res.redirect('users');
    }
    else
      res.render('users/new');
  });

};
