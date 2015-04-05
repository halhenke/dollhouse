ngApp = angular.module "dollhouse"

ngApp.controller "MainController", ['$scope', '$log', ($scope, $log) ->
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
