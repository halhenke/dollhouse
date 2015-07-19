ngApp = angular.module "dollhouse"



ngApp.controller "AuthController", ['$scope', '$http', '$window', 'lo', '$log', 'Profiles', ($scope, $http, $window, lo, $log, Profiles) ->
    $log.log "AuthController loaded..."
    $scope.log = $log

    $scope.user =
      username: 'john.doe'
      password: 'foobar'
    $scope.message = ''

    $scope.submit = ->
      $http.post('/users/login', $scope.user)
        .success((data, status, headers, config) ->
          $window.sessionStorage.token = data.token
          $scope.message = 'Welcome'
          return
        ).error (data, status, headers, config) ->
          # Erase the token if the user fails to log in
          delete $window.sessionStorage.token
          # Handle login errors here
          $scope.message = 'Error: Invalid user or password'
          return
      return
    # return


    # profileDetails = (profile) ->
    #   profile.details = []
    #   if profile.name?
    #     console.log "Name is found: #{profile.name.first}"
    #     profile.details.push
    #       key: "name"
    #       val: profile.name.first
    #   if profile.location?.suburb
    #     console.log "Location is found: #{profile.location}"
    #     profile.details.push
    #       key: "location"
    #       val: profile.location.suburb
    #   if profile.groups?
    #     profile.details.push
    #       key: "Groups"
    #       val: profile.groups
    #

    # Profiles.get().$promise.then (data) ->
    #   console.log "profileData is "
    #   for profile in data.profiles
    #     profileDetails profile
    #     if profile.profile
    #       profile.profile.avatar ?=
    #         url: lo.sample(hasslehoffs)
    #
    #   console.dir data
    #   $scope.data = data
    ]

# ngApp.controller "ProfileShowController", ['$scope', "lo", '$routeParams', 'Profile', ($scope, lo, $routeParams, Profile) ->
#
#     console.log "ProfileShowController loaded..."
#     $scope.lo = lo
#
#     # TODO: - extract this identical method from both here &
#     # DollsController
#     #  - a directive?
#     #  - a filter?
#     $scope.getAvatar = (url) ->
#       if url
#         { 'background-image': "url(#{url})" }
#       else
#         { 'background-image': "url(http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg)" }
#         # { 'background-image': "url(#{lo.sample(hasslehoffs)})" }
#
#     Profile.get(profile: $routeParams.profileSlug).$promise.then (data) ->
#       data.profile.profile.avatar ?=
#         url: lo.sample(hasslehoffs)
#       console.log "profileData is "
#       console.dir data
#       if data.dolls
#         data.dolls = lo.chunk(data.dolls, 4)
#       $scope.data = data
#     ]
