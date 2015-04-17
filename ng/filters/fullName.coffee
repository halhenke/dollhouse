angular.module("dollhouse").filter "fullName", ->
  (name) ->
    return "#{name.first} #{name.last}"

# Cant seem to use this in a view properly...
.filter "loChunk", ->
  (list) ->
    return lo.chunk(list, 3)

.filter "backName", ->
  (url) ->
    if url.match /dolls\/doll/
      return "Doll"
    else if url.match /dolls/
      return "Dolls"
    else if url.match /profiles\/profile/
      return "Profile"
    else if url.match /profiles/
      return "Profiles"
    else
      return "Previous Page"
