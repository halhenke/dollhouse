ngApp = angular.module "dollhouse"

ngApp.factory "Dolls", [ "$resource", ($resource) ->
  $resource "/api/dolls"
]
