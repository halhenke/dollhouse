ngApp = angular.module("dollhouse")

ngApp.directive "dollMixin", ["$templateCache", ($templateCache) ->
  scope:
    doll: "="
  template: $templateCache.get("directives/dollMixin.html")
  # templateURL: "directives/dollMixin.html"
]
