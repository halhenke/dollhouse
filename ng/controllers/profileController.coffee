ngApp = angular.module "dollhouse"

ngApp.controller "ProfileController", ['$scope', '$log', 'Profiles', ($scope, $log, Profiles) ->
    $log.log "ProfileController loaded..."
    $scope.log = $log

    Profiles.get().$promise.then (data) ->
      console.log "profileData is "
      # console.dir data
      # data.profiles = lo.chunk(data.profiles, 3)
      console.dir data
      $scope.data = data
    ]
