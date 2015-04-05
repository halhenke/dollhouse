var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Init locals
  locals.section = 'dolls';
  locals.filters = {
    category: req.params.category
  };
  locals.data = {
    dolls: [],
    categories: []
  };

  // Load the dolls
  view.on('init', function(next) {

    var q = keystone.list('Doll').paginate({
        page: req.query.page || 1,
        perPage: 9,
        maxPages: 10
      })
      // NOTE: Stop page breaking for people who arent loggged in
      .or([{'state': 'public'}, {'owner': (locals.user ? locals.user.id : null)}])
      // .sort('-publishedDate')
      .populate('owner');

    q.exec(function(err, results) {
      locals.data.dolls = results;
      next(err);
    });

  });

  // Return JSON
  view.render(function (err, req, res) {
    res.send(locals.data);
  });
};
