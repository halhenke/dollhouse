(function() {
  var ngApp;

  console.log('Angular loaded');

  ngApp = angular.module('dollhouse', ['ngRoute', 'ngResource', 'ui.bootstrap', 'templates']);

  ngApp.config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'dolls.html',
      controller: 'DollsController'
    }).when('/dolls', {
      templateUrl: 'dolls.html',
      controller: 'DollsController'
    }).when("/dolls/doll/:dollSlug", {
      templateUrl: 'doll.html',
      controller: 'DollShowController'
    }).when("/profiles", {
      templateUrl: 'profiles.html',
      controller: 'ProfilesController'
    }).when("/profiles/profile/:profileSlug", {
      templateUrl: 'profile.html',
      controller: 'ProfileShowController'
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.controller("DollsController", [
    '$scope', '$location', '$log', 'Dolls', function($scope, $location, $log, Dolls) {
      $log.log("DollsController loaded...");
      $log.log("location is " + ($location.url()));
      $scope.log = $log;
      return Dolls.get().$promise.then(function(data) {
        console.log("dollyData is ");
        console.dir(data);
        data.dolls = lo.chunk(data.dolls, 3);
        return $scope.data = data;
      });
    }
  ]);

  ngApp.controller("DollShowController", [
    '$scope', '$routeParams', 'Doll', function($scope, $routeParams, Doll) {
      return Doll.get({
        doll: $routeParams.dollSlug
      }).$promise.then(function(data) {
        console.log("dollData is ");
        console.dir(data);
        return $scope.data = data;
      });
    }
  ]);

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.controller("MainController", [
    '$scope', '$log', function($scope, $log) {
      $log.log("MainControler loaded...");
      $scope.log = $log;
      return $scope.awesomeThings = ["HTML5 Boilerplate", "AngularJS", "Karma", "Coffeescript", "Less", "Jade"];
    }
  ]);

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.controller("ProfilesController", [
    '$scope', '$log', 'Profiles', function($scope, $log, Profiles) {
      $log.log("ProfileController loaded...");
      $scope.log = $log;
      return Profiles.get().$promise.then(function(data) {
        console.log("profileData is ");
        data.profiles = lo.chunk(data.profiles, 3);
        console.dir(data);
        return $scope.data = data;
      });
    }
  ]);

  ngApp.controller("ProfileShowController", [
    '$scope', '$routeParams', 'Profile', function($scope, $routeParams, Profile) {
      return Profile.get({
        profile: $routeParams.profileSlug
      }).$promise.then(function(data) {
        console.log("profileData is ");
        console.dir(data);
        return $scope.data = data;
      });
    }
  ]);

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.directive("dollMixin", [
    "$templateCache", function($templateCache) {
      return {
        scope: {
          doll: "="
        },
        template: $templateCache.get("directives/dollMixin.html")
      };
    }
  ]);

  ngApp.directive("profileMixin", [
    "$templateCache", function($templateCache) {
      return {
        scope: {
          profile: "="
        },
        template: $templateCache.get("directives/profileMixin.html")
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("dollhouse").filter("fullName", function() {
    return function(name) {
      return name.first + " " + name.last;
    };
  });

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.factory("Dolls", [
    "$resource", function($resource) {
      return $resource("/api/dolls");
    }
  ]).factory("Doll", [
    "$resource", function($resource) {
      return $resource("/api/dolls/show/:doll");
    }
  ]);

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.factory("Profiles", [
    "$resource", function($resource) {
      return $resource("/api/profiles");
    }
  ]).factory("Profile", [
    "$resource", function($resource) {
      return $resource("/api/profiles/show/:profile");
    }
  ]);

}).call(this);

//# sourceMappingURL=/maps/ng.js.map