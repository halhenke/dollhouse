var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Init locals
  locals.section = 'links';
  locals.filters = {
    category: req.params.category
  };
  locals.data = {
    links: [],
  };

  // Load the dolls
  view.on('init', function(next) {

    console.log('Link - API Route - User is ' + locals.user);
    var q = keystone.list('CommunityLink').model.find()
      .where({'approved': true})
    // var q = keystone.list('Link').paginate({
    //     page: req.query.page || 1,
    //     perPage: 9,
    //     maxPages: 10
    //   })
    // NOTE: Stop page breaking for people who arent loggged in
    // .or([{'state': 'public'}, {'owner': (locals.user ? locals.user.id : null)}])
      // .sort('-publishedDate')
      .populate('owner');

    q.exec(function(err, results) {
      locals.data.links = results;
      next(err);
    });

  });

  // Return JSON
  view.render(function (err, req, res) {
    if (req.user) {
      locals.data.logged_in = true;
    }
    else {
      locals.data.logged_in = false;
    }
    res.send(locals.data);
  });
};
