ngApp = angular.module "dollhouse"

ngApp.factory "Dolls", [ "$resource", ($resource) ->
  $resource "/api/dolls"
]
  .factory "Doll", [ "$resource", ($resource) ->
    $resource "/api/dolls/show/:doll"
]
