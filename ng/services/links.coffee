ngApp = angular.module "dollhouse"

ngApp.factory "Links", [ "$resource", ($resource) ->
  $resource "/api/links"
  ]
