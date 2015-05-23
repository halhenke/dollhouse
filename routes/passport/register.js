var mongoose = require("mongoose"),
  // passport = require('passport'),
  keystone = require('keystone'),
  User = keystone.list('User');
  // LocalStrategy = require('passport-local').Strategy;

// var uri = "mongodb://localhost:27017/dollhouse";
// var db = mongoose.createConnection(uri);


module.exports = function (req, res) {
  var view = new keystone.View(req, res);

  view.render('passport/register');
};
