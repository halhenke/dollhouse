ngApp = angular.module "dollhouse"

ngApp.factory "Profiles", [ "$resource", ($resource) ->
  $resource "/api/profiles"
]
