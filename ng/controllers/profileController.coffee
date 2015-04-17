ngApp = angular.module "dollhouse"

ngApp.controller "ProfilesController", ['$scope', '$log', 'Profiles', ($scope, $log, Profiles) ->
    $log.log "ProfileController loaded..."
    $scope.log = $log

    Profiles.get().$promise.then (data) ->
      console.log "profileData is "
      data.profiles = lo.chunk(data.profiles, 3)
      console.dir data
      $scope.data = data
    ]

ngApp.controller "ProfileShowController", ['$scope', '$routeParams', 'Profile', ($scope, $routeParams, Profile) ->

    Profile.get(profile: $routeParams.profileSlug).$promise.then (data) ->
      console.log "profileData is "
      console.dir data
      data.dolls = lo.chunk(data.dolls, 3)
      $scope.data = data
    ]
