console.log('Angular loaded');

# console.log('Angular path ' + $location.url());


ngApp = angular.module('dollhouse', ['ngRoute', 'ngResource', 'templates'])

ngApp.config ($routeProvider) ->
    $routeProvider
      # .when '/note_tags',
      .when '/',
        # templateUrl: 'main.html'
        # template: "<p>This is a total crock of shit....</p>"
        templateUrl: 'dolls.html'
        controller: 'DollController'
      .when "/profiles",
        # template: "<p>This is a total crock of shit....</p>"
        templateUrl: 'profiles.html'
        controller: 'ProfileController'
      .when "/dollsNG",
        templateUrl: 'main.html'
        controller: 'MainController'
      .otherwise
        redirectTo: '/'
        # redirectTo: '/note_tags'
