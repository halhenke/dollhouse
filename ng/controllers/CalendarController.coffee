ngApp = angular.module "dollhouse"

ngApp.controller "CalendarController", ['$scope', '$log', 'Events', ($scope, $log, Events) ->
    $log.log "CalendarController loaded..."
    $scope.log = $log

    # Events.get().$promise.then (data) ->
    #   console.log "EventData is "
    #   console.dir data
    #   $scope.data = data

    $scope.eventSources = Events.get()

    ### config object ###

    $scope.uiConfig = calendar:
      height: 450
      editable: true
      header:
        left: 'month basicWeek basicDay agendaWeek agendaDay'
        center: 'title'
        right: 'today prev,next'
      dayClick: $scope.alertEventOnClick
      eventDrop: $scope.alertOnDrop
      eventResize: $scope.alertOnResize

    ]
