ngApp = angular.module "dollhouse"

ngApp.controller "DollsController", ['$scope', '$log', 'Dolls', ($scope, $log, Dolls) ->
    $log.log "DollsController loaded..."
    $scope.log = $log

    Dolls.get().$promise.then (data) ->
      console.log "dollyData is "
      console.dir data
      data.dolls = lo.chunk(data.dolls, 3)
      $scope.data = data
    ]

ngApp.controller "DollShowController", ['$scope', '$routeParams', 'Doll', ($scope, $routeParams, Doll) ->

    Doll.get(doll: $routeParams.dollSlug).$promise.then (data) ->
      console.log "dollData is "
      console.dir data
      $scope.data = data
    ]
