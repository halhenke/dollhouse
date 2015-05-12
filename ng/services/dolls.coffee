ngApp = angular.module "dollhouse"

ngApp.factory "Dolls", [ "$resource", ($resource) ->
  $resource "/api/dolls"
  ]
  .factory "Doll", [ "$resource", ($resource) ->
    $resource "/api/dolls/show/:doll"
  ]
  .factory "DollFacts", [ ->
    makers: dollMakers
  ]

dollMakers = [
  'Angell Studio'
  'Crobidoll'
  'Dearmine'
  'Doll Chateau'
  'Dollmore'
  'Dollshe'
  'Dollzone'
  'Dreaming Doll'
  'Elf Doll'
  'Fairyland'
  'Impldoll'
  'Iplehouse'
  'Leekeworld'
  'Luts'
  'Migidoll'
  'Obitsu'
  'Peakswoods'
  'Resinsoul'
  'Ringdoll'
  'Soom'
  'Supia'
  'Volks'
  'Other'
]
