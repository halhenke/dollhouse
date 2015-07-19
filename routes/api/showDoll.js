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
  };

  // Load the current doll
  view.on('init', function(next) {

    var q = keystone.list('Doll')
      .model.findOne({
        slug: locals.filters.doll
      }).populate('owner categories');



    q.exec(function(err, result) {
      locals.data.doll = result;
      next(err);
    });

  });

  // Return JSON
  view.render(function (err, req, res) {
    if (req.user && (req.user.slug === locals.data.doll.owner.slug)) {
      locals.data.edit = true;
    }
    else {
      locals.data.edit = false;
    }
    res.send(locals.data);
  });
};
