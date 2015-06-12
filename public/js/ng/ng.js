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
        templateUrl: 'widgets/filter_popup.html',
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
    '$scope', '$routeParams', '$modal', '$templateCache', 'Doll', function($scope, $routeParams, $modal, $templateCache, Doll) {
      return Doll.get({
        doll: $routeParams.dollSlug
      }).$promise.then(function(data) {
        console.log("dollData is ");
        console.dir(data);
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
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.animationsEnabled = true;
        $scope.open = function(size, doll) {
          var modalInstance;
          console.log("dollModal is ");
          console.dir(data);
          modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            template: $templateCache.get("widgets/modal.html"),
            backdrop: true,
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
              items: function() {
                return $scope.items;
              },
              doll: function() {
                return doll;
              }
            }
          });
          modalInstance.result.then((function(selectedItem) {
            $scope.selected = selectedItem;
          }), function() {});
        };
        $scope.toggleAnimation = function() {
          $scope.animationsEnabled = !$scope.animationsEnabled;
        };
        $scope.data = data;
        return $scope.details = [
          {
            key: "Name",
            val: data.doll.name
          }, {
            key: "Brand",
            val: data.doll.maker
          }, {
            key: "Sculpt",
            val: data.doll.sculpt
          }
        ];
      });
    }
  ]);

  ngApp.controller('ModalInstanceCtrl', function($scope, $modalInstance, items, doll) {
    $scope.items = items;
    $scope.doll = doll;
    $scope.selected = {
      item: $scope.items[0]
    };
    $scope.ok = function() {
      $modalInstance.close($scope.selected.item);
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
    console.log("in ModalInstanceCtrl & the scope is ");
    console.dir($scope);
  });

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
  var hasslehoffs, ngApp;

  ngApp = angular.module("dollhouse");

  hasslehoffs = ["http://res.cloudinary.com/doll-social-club/image/upload/v1433910519/missing/hasselhoff.jpg", "http://res.cloudinary.com/doll-social-club/image/upload/v1433910455/missing/David_Hasselhoff.jpg", "http://res.cloudinary.com/doll-social-club/image/upload/v1433910462/missing/1342557375_davidhasselhoff.jpg"];

  ngApp.controller("ProfilesController", [
    '$scope', 'lo', '$log', 'Profiles', function($scope, lo, $log, Profiles) {
      var profileDetails;
      $log.log("ProfileController loaded...");
      $scope.log = $log;
      profileDetails = function(profile) {
        var ref;
        profile.details = [];
        if (profile.name != null) {
          console.log("Name is found: " + profile.name.first);
          profile.details.push({
            key: "name",
            val: profile.name.first
          });
        }
        if ((ref = profile.location) != null ? ref.suburb : void 0) {
          console.log("Location is found: " + profile.location);
          profile.details.push({
            key: "location",
            val: profile.location.suburb
          });
        }
        if (profile.groups != null) {
          return profile.details.push({
            key: "Groups",
            val: profile.groups
          });
        }
      };
      return Profiles.get().$promise.then(function(data) {
        var base, i, len, profile, ref;
        console.log("profileData is ");
        ref = data.profiles;
        for (i = 0, len = ref.length; i < len; i++) {
          profile = ref[i];
          profileDetails(profile);
          if (profile.profile) {
            if ((base = profile.profile).avatar == null) {
              base.avatar = {
                url: lo.sample(hasslehoffs)
              };
            }
          }
        }
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
        var base;
        if ((base = data.profile.profile).avatar == null) {
          base.avatar = {
            url: lo.sample(hasslehoffs)
          };
        }
        console.log("profileData is ");
        console.dir(data);
        if (data.dolls) {
          data.dolls = lo.chunk(data.dolls, 4);
        }
        return $scope.data = data;
      });
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
          profile: "=",
          data: "="
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

  ngApp.directive("badges", [
    "$templateCache", function($templateCache) {
      return {
        scope: {
          badge: "="
        },
        template: $templateCache.get("directives/badges.html")
      };
    }
  ]);

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