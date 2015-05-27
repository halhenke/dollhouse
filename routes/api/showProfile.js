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

    var q = keystone.list('User')
      .model.findOne({
        slug: locals.filters.profile
      });
      // .populate("user");

    // q.exec(function(err, result) {
    q.exec()
      .then(function(profile) {
        console.log("Profile found " + profile);
        locals.data.profile = profile;
        return keystone.list('Doll').model
          .find()
          .where({owner: profile._id })
          .exec();
      }, function (err) {
        console.log('We got err ' + err);
      })
      // Handle Dolls
      .then(function (dolls) {
        console.log('Dolls found for ' + locals.data.profile.name + " are " + dolls);
        if (dolls.length > 0) {
          console.log('showProfile API call - We found some dolls ' + dolls.length);
          locals.data.dolls = dolls;
        }
        return keystone.list('CommunityLink').model
          .find()
          .where({ owner: locals.data.profile._id })
          .exec();
      }, function (err) {
        console.log('We got err ' + err);
      })
      .then(function (links) {
        console.log('Links found for ' + locals.data.profile.name + " are " + links);
        // Handle Links
        if (links.length > 0) {
          locals.data.links = links;
        }
        return keystone.list('User').model
          .find(
            {
              $and: [
                {
                  // Make sure we dont return the same fucking profile!
                  // _id: { $ne:  }
                  "location.geo":
                    { $near: { $geometry:
                        { type: "Point", coordinates: locals.data.profile.location.geo },
                          $maxDistance: 20 } }
                },
                {
                  _id: { $ne: locals.data.profile._id }
                }]})
          .exec();
;      }, function (err) {
        console.log('We got err ' + err);
      })
      .then(function (neighbours) {
        console.log('Profile Neighbours found for ' + locals.data.profile.name + " are " + neighbours);
        locals.data.neighbours = neighbours;
        next();
      });
  });

  // Return JSON
  view.render(function (err, req, res) {
    res.send(locals.data);
  });
};
