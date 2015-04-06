ngApp = angular.module "dollhouse"

ngApp.factory "Profiles", [ "$resource", ($resource) ->
  $resource "/api/profiles"
]
  .factory "Profile", [ "$resource", ($resource) ->
    $resource "/api/profiles/show/:profile"
]
