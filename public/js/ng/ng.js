(function() {
  var ngApp;

  console.log('Angular loaded');

  ngApp = angular.module('dollhouse', ['ngRoute', 'ngResource', "ngSanitize", 'ui.bootstrap', 'ui.calendar', 'templates']);

  ngApp.config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'dolls.html',
      controller: 'DollsController'
    }).when('/links', {
      templateUrl: 'links.html',
      controller: 'LinksController'
    }).when('/calendar', {
      templateUrl: 'calendar.html',
      controller: 'CalendarController'
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
  }).run([
    '$rootScope', '$location', function($rootScope, $location) {
      return $rootScope.$on('$locationChangeStart', function(event, absNewURL, absOldURL) {
        if (absOldURL === $location.absUrl()) {
          $rootScope.previousPage = "#/dolls";
          return console.log("Fake Previous Page " + $rootScope.previousPage);
        } else {
          return $rootScope.previousPage = absOldURL;
        }
      });
    }
  ]);

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.controller("CalendarController", [
    '$scope', '$log', 'Events', function($scope, $log, Events) {
      $log.log("CalendarController loaded...");
      $scope.log = $log;
      $scope.eventSources = Events.get();

      /* config object */
      return $scope.uiConfig = {
        calendar: {
          height: 450,
          editable: true,
          header: {
            left: 'month basicWeek basicDay agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          dayClick: $scope.alertEventOnClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize
        }
      };
    }
  ]);

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.controller("DollsController", [
    '$scope', 'lo', '$log', 'Dolls', 'DollFacts', function($scope, lo, $log, Dolls, DollFacts) {
      $log.log("DollsController loaded...");
      $scope.log = $log;
      $scope.makers = DollFacts.makers;
      $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'directives/detailList.html',
        title: 'Title'
      };
      $scope.getAvatar = function(url) {
        if (url) {
          return {
            'background-image': "url(" + url + ")"
          };
        } else {
          return {
            'background-image': "url(http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg)"
          };
        }
      };
      return Dolls.get().$promise.then(function(data) {
        console.log("dollyData is ");
        console.dir(data);
        data.dolls = lo.chunk(data.dolls, 4);
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

  ngApp.controller("LinksController", [
    '$scope', 'lo', '$log', 'Links', function($scope, lo, $log, Links) {
      $log.log("LinksController loaded...");
      $scope.log = $log;
      return Links.get().$promise.then(function(data) {
        console.log("LinkData is ");
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
    '$scope', "lo", '$routeParams', 'Profile', function($scope, lo, $routeParams, Profile) {
      console.log("ProfileShowController loaded...");
      $scope.lo = lo;
      $scope.getAvatar = function(url) {
        if (url) {
          return {
            'background-image': "url(" + url + ")"
          };
        } else {
          return {
            'background-image': "url(http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg)"
          };
        }
      };
      return Profile.get({
        profile: $routeParams.profileSlug
      }).$promise.then(function(data) {
        console.log("profileData is ");
        console.dir(data);
        if (data.dolls) {
          data.dolls = lo.chunk(data.dolls, 3);
        }
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
        scope: true,
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

  ngApp.directive("linkMixin", [
    "$templateCache", function($templateCache) {
      return {
        scope: {
          link: "="
        },
        template: $templateCache.get("directives/linkMixin.html")
      };
    }
  ]);

  ngApp.directive("detailList", [
    "$templateCache", function($templateCache) {
      return {
        scope: {
          details: "="
        },
        template: $templateCache.get("directives/detailList.html")
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("dollhouse").filter("fullName", function() {
    return function(name) {
      return name.first + " " + name.last;
    };
  }).filter("loChunk", function() {
    return function(list) {
      return lo.chunk(list, 3);
    };
  }).filter("backName", function() {
    return function(url) {
      if (url.match(/dolls\/doll/)) {
        return "Doll";
      } else if (url.match(/dolls/)) {
        return "Dolls";
      } else if (url.match(/profiles\/profile/)) {
        return "Profile";
      } else if (url.match(/profiles/)) {
        return "Profiles";
      } else if (url.match(/links/)) {
        return "Community Links";
      } else {
        return "Previous Page";
      }
    };
  });

}).call(this);

(function() {
  var dollMakers, ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.factory("Dolls", [
    "$resource", function($resource) {
      return $resource("/api/dolls");
    }
  ]).factory("Doll", [
    "$resource", function($resource) {
      return $resource("/api/dolls/show/:doll");
    }
  ]).factory("DollFacts", [
    function() {
      return {
        makers: dollMakers
      };
    }
  ]);

  dollMakers = ['Angell Studio', 'Crobidoll', 'Dearmine', 'Doll Chateau', 'Dollmore', 'Dollshe', 'Dollzone', 'Dreaming Doll', 'Elf Doll', 'Fairyland', 'Impldoll', 'Iplehouse', 'Leekeworld', 'Luts', 'Migidoll', 'Obitsu', 'Peakswoods', 'Resinsoul', 'Ringdoll', 'Soom', 'Supia', 'Volks', 'Other'];

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.factory("Events", function() {
    return {
      get: function() {
        return {
          events: [
            {
              title: 'One Event',
              start: '2015-05-07'
            }, {
              title: 'A Doll Uprising',
              start: '2015-05-17'
            }
          ],
          color: 'yellow',
          textColor: 'black'
        };
      }
    };
  });

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.factory("Links", [
    "$resource", function($resource) {
      return $resource("/api/links");
    }
  ]);

}).call(this);

(function() {
  var ngApp;

  ngApp = angular.module("dollhouse");

  ngApp.factory("lo", [
    "$window", function($window) {
      var lo;
      lo = $window.lo;
      return lo;
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