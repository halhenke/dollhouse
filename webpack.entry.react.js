// var reactComponents = function (reactTemplate) {
//     return require("script!react/components/" + reactTemplate + ".js";)


module.exports = {
  // lo: require('lodash'),
  // jade: require('jade/runtime'),
  React: require('react'),
  // reactComponents: function (reactTemplate) {
  //   return require("script!./react/components/js/" + reactTemplate + ".js");
  // }
  // reactComponents: (function (reactTemplate) {
  //   return require("script!react/components/js/" + reactTemplate + ".js");
  // })()
  // doll: require("script!./react/components/js/doll.js")

  // doll: require("jade-react!./react/components/jade/doll.jade")
  doll: require("coffee-jsx!./react/components/cjsx/Doll.cjsx")
};


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
