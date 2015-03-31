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
    profiles: []
  };

  // Load the current Profile
  view.on('init', function(next) {

    var q = keystone.list('profile')
      .model.findOne({
        state: 'public',
        slug: locals.filters.profile
      }).populate('owner profiles');

    q.exec(function(err, result) {
      locals.data.profile = result;
      next(err);
    });

  });

  // Load some similar profiles?
  // - Think about this
  // view.on('init', function(next) {
  //
  //   var q = keystone.list('profile')
  //     .model.find()
  //     .where('state', 'public')
  //     .sort('-publishedDate')
  //     .populate('owner').limit('4');
  //
  //   q.exec(function(err, results) {
  //     locals.data.profiles = results;
  //     next(err);
  //   });
  //
  // });

  // Render the view
  view.render('profiles/show');

};
