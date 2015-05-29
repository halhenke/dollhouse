module.exports = {
  lo: require('lodash'),
  angular: require("angular"),
  "angular-route": require("angular-route"),
  "angular-resource": require("angular-resource"),
};

// Doesnt need to be exported
// - must come after angular require though
require("angular-sanitize");
require("script!./node_modules/angular-ui-bootstrap/ui-bootstrap.js");
require("script!./bower/moment/min/moment.min.js");
require("script!./bower/angular-ui-calendar/src/calendar.js");
require("script!./bower/fullcalendar/dist/fullcalendar.min.js");
require("script!./bower/fullcalendar/dist/gcal.js");


// STYLES
// require("style/url!./bower/fullcalendar/dist/fullcalendar.min.css");
// require("./bower/fullcalendar/dist/fullcalendar.min.css");

// Because we have problems with paths when copying with file
// require("./public/styles/fullcalendar.min.css");
