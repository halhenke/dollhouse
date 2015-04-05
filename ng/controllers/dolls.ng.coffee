ngApp = angular.module "dollhouse"

ngApp.controller "DollController", ['$scope', '$log', 'Dolls', ($scope, $log, Dolls) ->
    $log.log "DollController loaded..."
    $scope.log = $log

    Dolls.get().$promise.then (data) ->
      console.log "dollyData is "
      console.dir data
      data.dolls = lo.chunk(data.dolls, 3)
      $scope.data = data
    ]
