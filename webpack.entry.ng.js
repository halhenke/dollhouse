module.exports = {
  lo: require('lodash'),
  angular: require("angular"),
  "angular-route": require("angular-route"),
  "angular-resource": require("angular-resource"),

  // jade: require('jade/runtime'),
  // React: require('react'),
  // reactComponents: function (reactTemplate) {
  //   return require("script!./react/components/js/" + reactTemplate + ".js");
  // }
  // reactComponents: (function (reactTemplate) {
  //   return require("script!react/components/js/" + reactTemplate + ".js");
  // })()
  // doll: require("script!./react/components/js/doll.js")

  // doll: require("jade-react!./react/components/jade/doll.jade")
  // doll: require("coffee-jsx!./react/components/cjsx/Doll.cjsx")
};

// Doesnt need to be exported
// - must come after angular require though
require("script!./node_modules/angular-ui-bootstrap/ui-bootstrap.js");


// module.exports = {
//   // _: require('lodash'),
//   // jade: require('jade/runtime'),
//   React: require('react'),
//   // reactComponents: function (reactTemplate) {
//   //   return require("script!./react/components/js/" + reactTemplate + ".js");
//   // }
//   // reactComponents: (function (reactTemplate) {
//   //   return require("script!react/components/js/" + reactTemplate + ".js");
//   // })()
//   // doll: require("script!./react/components/js/doll.js")
//   doll: require("./react/components/js/doll.js")
// };
