ngApp = angular.module("dollhouse")

ngApp.directive "dollMixin", ["$templateCache", ($templateCache) ->
  scope:
    doll: "="
  template: $templateCache.get("directives/dollMixin.html")
  # templateURL: "directives/dollMixin.html"
]

ngApp.directive "profileMixin", ["$templateCache", ($templateCache) ->
  scope:
    profile: "="
  template: $templateCache.get("directives/profileMixin.html")
  # templateURL: "directives/dollMixin.html"
]

ngApp.directive "linkMixin", ["$templateCache", ($templateCache) ->
  scope:
    link: "="
  template: $templateCache.get("directives/linkMixin.html")
]
