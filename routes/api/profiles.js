var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Init locals
  locals.section = 'profiles';
  locals.filters = {
    category: req.params.category
  };
  locals.data = {
    profiles: [],
    categories: []
  };

  // Load the profiles
  view.on('init', function(next) {

    var q = keystone.list('Profile').model.find()
    // var q = keystone.list('Profile').paginate({
    //     page: req.query.page || 1,
    //     perPage: 10,
    //     maxPages: 10
    //   })
      .or([{'state': 'public'}, {'owner': (locals.user ? locals.user.id : null)}])
      // .sort('-publishedDate')
      .populate('user');

    q.exec(function(err, results) {
      locals.data.profiles = results;
      next(err);
    });

  });

  // Return JSON
  view.render(function (err, req, res) {
    res.send(locals.data);
  });
};
