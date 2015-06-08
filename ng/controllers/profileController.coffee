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

ngApp.controller "ProfileShowController", ['$scope', "lo", '$routeParams', 'Profile', ($scope, lo, $routeParams, Profile) ->

    console.log "ProfileShowController loaded..."
    $scope.lo = lo

    # TODO: - extract this identical method from both here &
    # DollsController
    #  - a directive?
    #  - a filter?
    $scope.getAvatar = (url) ->
      if url
        { 'background-image': "url(#{url})" }
      else
        { 'background-image': "url(http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg)" }

    Profile.get(profile: $routeParams.profileSlug).$promise.then (data) ->
      console.log "profileData is "
      console.dir data
      if data.dolls
        data.dolls = lo.chunk(data.dolls, 4)
      $scope.data = data
    ]
