var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Init locals
  locals.section = 'community';
  locals.data = {
  };

  res.set('Cache-Control', "public, max-age=3600");
  // Render the view
  view.render('community');
};
