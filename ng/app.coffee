console.log('Angular loaded');

# console.log('Angular path ' + $location.url());


ngApp = angular.module('dollhouse', ['ngRoute', 'templates'])

ngApp.config ($routeProvider) ->
    $routeProvider
      # .when '/note_tags',
      .when '/',
        # templateUrl: 'main.html'
        # template: "<p>This is a total crock of shit....</p>"
        templateUrl: 'main.html'
        controller: 'MainController'
      .when "/second",
        # template: "<p>This is a total crock of shit....</p>"
        templateUrl: 'next.html'
        controller: 'MainController'
      .when "/dollsNG",
        templateUrl: 'dolls.html'
        controller: 'DollController'
      .otherwise
        redirectTo: '/'
        # redirectTo: '/note_tags'
