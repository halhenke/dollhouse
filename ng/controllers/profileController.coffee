ngApp = angular.module "dollhouse"

ngApp.controller "ProfilesController", ['$scope', '$log', 'Profiles', ($scope, $log, Profiles) ->
    $log.log "ProfileController loaded..."
    $scope.log = $log

    profileDetails = (profile) ->
      profile.details = []
      if profile.name?
        console.log "Name is found: #{profile.name.first}"
        profile.details.push
          key: "name"
          val: profile.name.first
      if profile.location?.suburb
        console.log "Location is found: #{profile.location}"
        profile.details.push
          key: "location"
          val: profile.location.suburb
      if profile.groups?
        profile.details.push
          key: "Groups"
          val: profile.groups


    Profiles.get().$promise.then (data) ->
      console.log "profileData is "
      for profile in data.profiles
        profileDetails profile

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
