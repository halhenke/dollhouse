var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'dolls';
  locals.filters = {
    doll: req.params.doll
  };
  locals.data = {
    dolls: []
  };

  // Load the current doll
  view.on('init', function(next) {

    var q = keystone.list('Doll')
      .model.findOne({
        state: 'public',
        slug: locals.filters.doll
      }).populate('owner categories');

    q.exec(function(err, result) {
      locals.data.doll = result;
      next(err);
    });

  });

  // Load some similar dolls?
  // - Think about this
  // view.on('init', function(next) {
  //
  //   var q = keystone.list('Doll')
  //     .model.find()
  //     .where('state', 'public')
  //     .sort('-publishedDate')
  //     .populate('owner').limit('4');
  //
  //   q.exec(function(err, results) {
  //     locals.data.dolls = results;
  //     next(err);
  //   });
  //
  // });

  // Render the view
  view.render('dolls/show');

};
