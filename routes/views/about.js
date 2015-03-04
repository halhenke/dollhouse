var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'about';
  locals.data = {};

  view.on('init', function(next) {
    keystone.list('About').model.findOne().exec(function(err, results) {
      if (err || !results) {
        return next(err);
      }
      locals.data.about = results;
      next();
    });
  });

  view.render('about');
};
