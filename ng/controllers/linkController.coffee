ngApp = angular.module "dollhouse"

ngApp.controller "LinksController", ['$scope', 'lo', '$log', 'Links', ($scope, lo, $log, Links) ->
    $log.log "LinksController loaded..."
    $scope.log = $log

    Links.get().$promise.then (data) ->
      console.log "LinkData is "
      console.dir data
      $scope.data = data
    ]
