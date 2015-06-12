ngApp = angular.module "dollhouse"

hasslehoffs = [
  "http://res.cloudinary.com/doll-social-club/image/upload/v1433910519/missing/hasselhoff.jpg"
  "http://res.cloudinary.com/doll-social-club/image/upload/v1433910455/missing/David_Hasselhoff.jpg"
  "http://res.cloudinary.com/doll-social-club/image/upload/v1433910462/missing/1342557375_davidhasselhoff.jpg"
]

ngApp.controller "ProfilesController", ['$scope', 'lo', '$log', 'Profiles', ($scope, lo, $log, Profiles) ->
    $log.log "ProfileController loaded..."
    $scope.log = $log

    # hasslehoffs = [
    #   "http://res.cloudinary.com/doll-social-club/image/upload/v1433910519/missing/hasselhoff.jpg"
    #   "http://res.cloudinary.com/doll-social-club/image/upload/v1433910455/missing/David_Hasselhoff.jpg"
    #   "http://res.cloudinary.com/doll-social-club/image/upload/v1433910462/missing/1342557375_davidhasselhoff.jpg"
    # ]

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
        if profile.profile
          profile.profile.avatar ?=
            url: lo.sample(hasslehoffs)

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
        # { 'background-image': "url(#{lo.sample(hasslehoffs)})" }

    Profile.get(profile: $routeParams.profileSlug).$promise.then (data) ->
      data.profile.profile.avatar ?=
        url: lo.sample(hasslehoffs)
      console.log "profileData is "
      console.dir data
      if data.dolls
        data.dolls = lo.chunk(data.dolls, 4)
      $scope.data = data
    ]
