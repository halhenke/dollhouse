var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'profiles';
  locals.filters = {
    profile: req.params.profile
  };
  locals.data = {
  };

  // Load the current profile
  view.on('init', function(next) {

    var q = keystone.list('Profile')
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

  // Return JSON
  view.render(function (err, req, res) {
    res.send(locals.data);
  });
};
