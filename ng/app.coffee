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
        controller: 'MainCtrl'
      .when "/second",
        # template: "<p>This is a total crock of shit....</p>"
        templateUrl: 'next.html'
        controller: 'MainCtrl'
      .otherwise
        redirectTo: '/'
        # redirectTo: '/note_tags'


ngApp.controller "MainCtrl", ['$scope', '$log', ($scope, $log) ->
    $log.log "MainControler loaded..."
    $scope.log = $log
    $scope.awesomeThings = [
      "HTML5 Boilerplate"
      "AngularJS"
      "Karma"
      "Coffeescript"
      "Less"
      "Jade"
    ]]
