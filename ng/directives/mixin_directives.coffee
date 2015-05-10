ngApp = angular.module("dollhouse")

ngApp.directive "dollMixin", ["$templateCache", ($templateCache) ->
  scope: true
    # doll: "="
    # getAvatar: "&getAvatar"
    # getAvatar: (url) ->
    #   return "happyDays"
      # $log("getAvatar called with #{url}")
      # if url
      #   { 'background-image': "url(#{url})" }
      # else
      #   { 'background-image': "url(http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg)" }
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
