var keystone = require('keystone'),
      config = require('../../config'),
      User = keystone.list('User');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'users';
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.userSubmitted = false;


  view.on('post', function(next) {
      var newUser = new User.model({ owner: req.user });
      newUser
        .getUpdateHandler(req, res)
        .process(req.body, {
          flashErrors: true,
          fields: "",
          errorMessage: 'Hmmmm: There was a problem submitting your user...'
        }, function(err) {
          if (err) {
            locals.validationErrors = err.errors;
          } else {
            locals.userSubmitted = true;
          }
          next();
        });

    });

  view.render(function (err, req, res) {
    if (req.method === 'POST' && res.locals.userSubmitted) {
      res.redirect('/users');
    }
    else
      // res.send(locals.formData);
      res.send(locals);
  });

};
