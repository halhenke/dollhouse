var keystone = require('keystone'),
      config = require('../../config'),
      Doll = keystone.list('Doll');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'dolls';
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.dolls = config.dolls;
  locals.dollSubmitted = false;


  view.on('post', function(next) {
      console.log('Doll Image body: ');
      console.dir(req.body);
      console.log('Doll Image params: ');
      console.dir(req.params);
      var newDoll = new Doll.model({ owner: req.user });
      newDoll
        .getUpdateHandler(req, res)
        .process(req.body, {
          flashErrors: true,
          fields: 'name, owner, maker, sculpt, image, info.description, info.biography',
          errorMessage: 'Hmmmm: There was a problem submitting your doll...'
        }, function(err) {
          if (err) {
            locals.validationErrors = err.errors;
          } else {
            locals.dollSubmitted = true;
          }
          next();
        });

    });

  // console.log("New Doll got called..." + req.method);
  view.render(function (err, req, res) {
    if (req.method === 'POST' && res.locals.dollSubmitted) {
      res.redirect('/community/#/dolls');
    }
    else
      res.render('dolls/new');
  });

};
