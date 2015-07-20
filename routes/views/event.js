var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'events';
  locals.filters = {
    event: req.params.event
  };
  locals.data = {
    events: []
  };

  // Load the current event
  view.on('init', function(next) {

    var q = keystone.list('Event').model.findOne({
      // state: 'published',
      slug: locals.filters.event
    }).populate('author categories');

    q.exec(function(err, result) {
      locals.data.event = result;
      locals.data.eventDetails = [
        {
          key: "Date",
          val: locals.data.event._.startDate.format("dddd, MMMM Do") +
                " - " +
                locals.data.event._.endDate.format("dddd, MMMM Do")
        }, {
          key: "Time",
          val: locals.data.event._.startTime.format("hh:mm a") +
                " - " +
                locals.data.event._.endTime.format("hh:mm a")
        }, {
          key: "Details",
          val: locals.data.event.placeString
        }
      ];

      next(err);
    });

  });

  // Load other events
  view.on('init', function(next) {

    var q = keystone.list('Event').model
      .find()
      .where('state', 'published')
      .sort('-publishedDate')
      .populate('author')
      .limit('4');

    q.exec(function(err, results) {
      locals.data.events = results;
      next(err);
    });

  });

  // Render the view
  view.render('event');

};
