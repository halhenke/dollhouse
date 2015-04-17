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
        slug: locals.filters.profile
      })
      .populate("user");

    q.exec(function(err, result) {
      keystone.list('Doll').model
        .find()
        .where({owner: result.user })
        .exec()
        .then(function (dolls) {
          console.log('Dolls found for ' + result.user.name + " are " + dolls);
          // NOTE: this doesnt work
          // result.dolls = dolls;
          locals.data.dolls = dolls;
          locals.data.profile = result;
          next(err);
        });
    });

  });

  // Return JSON
  view.render(function (err, req, res) {
    res.send(locals.data);
  });
};
