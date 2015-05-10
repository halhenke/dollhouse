ngApp = angular.module "dollhouse"

# ngApp.factory "Events", [ "$resource", ($resource) ->
#   $resource "/api/events"
# ]


ngApp.factory "Events", ->
  get: ->
    events: [
      {
        title: 'One Event'
        start: '2015-05-07'
      }
      {
        title: 'A Doll Uprising'
        start: '2015-05-17'
      }
    ]
    color: 'yellow'
    textColor: 'black'
