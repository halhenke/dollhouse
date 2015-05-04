console.log('Angular loaded');

# console.log('Angular path ' + $location.url());


ngApp = angular.module('dollhouse', ['ngRoute', 'ngResource', 'ui.bootstrap', 'templates'])

ngApp.config ($routeProvider) ->
    $routeProvider
      # .when '/dolls',
      .when '/',
        templateUrl: 'dolls.html'
        controller: 'DollsController'
      .when '/links',
        templateUrl: 'links.html'
        controller: 'LinksController'
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
