var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'home';
  // locals.filters = {
  //   doll: req.params.doll
  // };
  locals.data = {
    // dolls: []
  };

  // Load the current doll
  view.on('init', function(next) {

    var q = keystone.list('HomePage')
      .model.findOne({
        // state: 'public',
      });

    q.exec(function(err, result) {
      locals.data.home = result;
      next(err);
    });

  });

  // Render the view
  view.render('home');

};
