ngApp = angular.module "dollhouse"

ngApp.factory "lo", [ "$window", ($window) ->
  lo = $window.lo
  # console.log "We invoked the lodash service with #{lo}"
  return lo
]
