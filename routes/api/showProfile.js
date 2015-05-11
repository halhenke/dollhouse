var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals,
    nearCriteria = { maxDistance: 10, spherical: true };

  // Set locals
  locals.section = 'profiles';
  locals.filters = {
    profile: req.params.profile
  };
  locals.data = {
  };

  // Load the current profile
  view.on('init', function(next) {

    console.log("showProfile - API called...");

    var q = keystone.list('Profile')
      .model.findOne({
        slug: locals.filters.profile
      })
      .populate("user");

    // q.exec(function(err, result) {
    q.exec()
      .then(function(profile) {
        console.log("Profile found " + profile);
        locals.data.profile = profile;
        return keystone.list('Doll').model
          .find()
          .where({owner: profile.user })
          .exec();
      }, function (err) {
        console.log('We got err ' + err);
      })
      // Handle Dolls
      .then(function (dolls) {
        console.log('Dolls found for ' + locals.data.profile.user.name + " are " + dolls);
        // NOTE: this doesnt work
        // result.dolls = dolls;
        locals.data.dolls = dolls;
      //   next()
      // })
        return keystone.list('CommunityLink').model
          .find()
          .where({ owner: locals.data.profile })
          .exec();
      }, function (err) {
        console.log('We got err ' + err);
      })
      .then(function (links) {
        console.log('Links found for ' + locals.data.profile.user.name + " are " + links);
        // Handle Links
        locals.data.links = links;
        return keystone.list('User').model
          .find({
            // Make sure we dont return the same fucking profile!
            // _id: { $ne:  }
            "location.geo":
              { $near: { $geometry:
                  { type: "Point", coordinates: locals.data.profile.user.location.geo },
                    $maxDistance: 20 } }
          // }, "_id")
          })
          .exec();
;      }, function (err) {
        console.log('We got err ' + err);
      })
      // Need to get Profiles from User Models
      .then(function (neighbours) {
        console.log('User Neighbours found for ' + locals.data.profile.user.name + " are " + neighbours);
        // Handle nearby users
        return keystone.list('Profile').model
          .where({ user: { $in: neighbours }})
          .exec(function () {
            console.log('We got called here...');
          });
        }, function (err) {
        console.log('We got err ' + err);
      })
      .then(function (neighbours) {
        console.log('Profile Neighbours found for ' + locals.data.profile.user.name + " are " + neighbours);
        locals.data.neighbours = neighbours;
        next();
      });
  });

  // Return JSON
  view.render(function (err, req, res) {
    res.send(locals.data);
  });
};
