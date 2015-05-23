var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'users';
  locals.filters = {
    user: req.params.user
  };
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

  // Render the view
  view.render('users/show');

};
