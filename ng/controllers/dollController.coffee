ngApp = angular.module "dollhouse"

ngApp.controller "DollsController", ['$scope', 'lo', '$log', 'Dolls', 'DollFacts', ($scope, lo, $log, Dolls, DollFacts) ->
    $log.log "DollsController loaded..."
    $scope.log = $log

    $scope.makers = DollFacts.makers

    # Experiment with popover for filters
    $scope.dynamicPopover =
      content: 'Hello, World!'
      templateUrl: 'directives/detailList.html'
      title: 'Title'


    $scope.getAvatar = (url) ->
      if url
        { 'background-image': "url(#{url})" }
      else
        { 'background-image': "url(http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg)" }

    Dolls.get().$promise.then (data) ->
      console.log "dollyData is "
      console.dir data
      data.dolls = lo.chunk(data.dolls, 4)
      $scope.data = data
    ]

ngApp.controller "DollShowController", ['$scope', '$routeParams', 'Doll', ($scope, $routeParams, Doll) ->

    Doll.get(doll: $routeParams.dollSlug).$promise.then (data) ->
      console.log "dollData is "
      console.dir data
      $scope.data = data
    ]
