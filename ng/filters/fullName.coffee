angular.module("dollhouse").filter "fullName", ->
  (name) ->
    return "#{name.first} #{name.last}"
