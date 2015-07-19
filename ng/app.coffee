console.log('Angular loaded');

# console.log('Angular path ' + $location.url());


ngApp = angular.module('dollhouse', ['ngRoute', 'ngResource', "ngSanitize", 'ui.bootstrap', 'ui.calendar', 'templates'])

ngApp.config ($routeProvider) ->
    $routeProvider
      # .when '/dolls',
      .when '/',
        templateUrl: 'dolls.html'
        controller: 'DollsController'
      .when '/login',
        templateUrl: 'login.html'
        controller: 'AuthController'
      .when '/links',
        templateUrl: 'links.html'
        controller: 'LinksController'
      .when '/calendar',
        templateUrl: 'calendar.html'
        controller: 'CalendarController'
      .when '/dolls',
        templateUrl: 'dolls.html'
        controller: 'DollsController'
      .when "/dolls/doll/:dollSlug",
        templateUrl: 'doll.html'
        controller: 'DollShowController'
      .when "/profiles",
        templateUrl: 'profiles.html'
        controller: 'ProfilesController'
      .when "/profiles/profile/:profileSlug",
        templateUrl: 'profile.html'
        controller: 'ProfileShowController'
      .otherwise
        redirectTo: '/'

  .run ['$rootScope', '$location', ($rootScope, $location) ->
    $rootScope.$on '$locationChangeStart', (event, absNewURL, absOldURL) ->
      # console.log "Location change #{absOldURL}"
      if absOldURL is $location.absUrl()
        $rootScope.previousPage = "#/dolls"
        console.log "Fake Previous Page #{$rootScope.previousPage}"
      else
        $rootScope.previousPage = absOldURL
  ]
