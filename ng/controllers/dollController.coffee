ngApp = angular.module "dollhouse"

ngApp.controller "DollsController", ['$scope', 'lo', '$log', 'Dolls', 'DollFacts', ($scope, lo, $log, Dolls, DollFacts) ->
    $log.log "DollsController loaded..."
    $scope.log = $log

    $scope.makers = DollFacts.makers

    # Experiment with popover for filters
    $scope.dynamicPopover =
      content: 'Hello, World!'
      templateUrl: 'directives/detailList.html'
      title: 'Title'


    $scope.getAvatar = (url) ->
      if url
        { 'background-image': "url(#{url})" }
      else
        { 'background-image': "url(http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg)" }

    Dolls.get().$promise.then (data) ->
      console.log "dollyData is "
      console.dir data
      data.dolls = lo.chunk(data.dolls, 4)
      $scope.data = data
    ]

ngApp.controller "DollShowController", ['$scope', '$routeParams', '$modal', '$templateCache', 'Doll', ($scope, $routeParams, $modal, $templateCache, Doll) ->

    Doll.get(doll: $routeParams.dollSlug).$promise.then (data) ->
      console.log "dollData is "
      console.dir data

      $scope.getAvatar = (url) ->
        if url
          { 'background-image': "url(#{url})" }
        else
          { 'background-image': "url(http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg)" }


      # MODALS
      $scope.items = ['item1', 'item2', 'item3']
      # $scope.items = data.doll.gallery
      $scope.animationsEnabled = true

      $scope.open = (size, doll) ->
        console.log "dollModal is "
        console.dir data

        modalInstance = $modal.open(
          animation: $scope.animationsEnabled
          # templateUrl: 'widgets/modal.html'
          template: $templateCache.get("widgets/modal.html")
          backdrop: true
          # windowTemplateUrl: "widgets/modalWindow.html"
          # template: "img(ng-if='doll.url' src='{{doll.url}}').img"
          # template: "<img src=#{doll.url} class='img'></img><p>#{doll.url}</p>"
          # template: "<img src=#{doll.url} class='img'></img>"
          controller: 'ModalInstanceCtrl'
          # doll: doll
          size: size
          # scope: ->
          #   console.log "scope called..."
          #   doll: doll
          resolve:
            items: ->
              $scope.items
            doll: ->
              doll
        )
        modalInstance.result.then ((selectedItem) ->
          $scope.selected = selectedItem
          return
        ), ->
          # $log.info 'Modal dismissed at: ' + new Date
          return
        return

      $scope.toggleAnimation = ->
        $scope.animationsEnabled = not $scope.animationsEnabled
        return


      $scope.data = data
      # SET UP DETAIL LIST
      $scope.details = [
        {
          key: "Name"
          val: data.doll.name
        }
        {
          key: "Brand"
          val: data.doll.maker

        }
        {
          key: "Sculpt"
          val: data.doll.sculpt
        }
      ]
    ]

ngApp.controller 'ModalInstanceCtrl', ($scope, $modalInstance, items, doll) ->
  $scope.items = items
  $scope.doll = doll
  $scope.selected =
    item: $scope.items[0]

  $scope.ok = ->
    $modalInstance.close $scope.selected.item
    return

  $scope.cancel = ->
    $modalInstance.dismiss 'cancel'
    return

  console.log "in ModalInstanceCtrl & the scope is "
  console.dir $scope

  return
