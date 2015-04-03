ngApp = angular.module "dollhouse"

ngApp.controller "DollController", ['$scope', '$log', ($scope, $log) ->
    $log.log "MainControler loaded..."
    $scope.log = $log
    $scope.lo = lo
    $scope.data = data
    ]

data =
  dolls:
    total: 13
    results: [
      {
        _id: "54fb633ff6cb3c80ac705667"
        slug: "annabelle"
        maker: "Other Guys"
        name: "Annabelle"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        content:
          brief: "<p>I made this!</p>"
          extended: ""

        image:
          public_id: "qkeekodoglor4wje5hug"
          version: 1425761612
          signature: "a2b5c0e7c0a561a62da53d43c2dc3cc0e8726cfe"
          width: 500
          height: 337
          format: "jpg"
          resource_type: "image"
          url: "http://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg"
          secure_url: "https://res.cloudinary.com/keystone-demo/image/upload/v1425761612/qkeekodoglor4wje5hug.jpg"

        state: "public"
      }
      {
        _id: "54fb8a3417f40010d61cf9a3"
        slug: "banjo-patterson"
        maker: "Ipplehouse"
        name: "Banjo Patterson"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        state: "public"
      }
      {
        _id: "54fb9c8effc3f4c9e93cfc51"
        slug: "bobba-fett"
        maker: "Ipplehouse"
        name: "Bobba Fett"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        state: "public"
      }
      {
        _id: "54fb9e1a9e292e2becde601c"
        slug: "doc-brown"
        maker: "Ipplehouse"
        name: "Doc Brown"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        state: "public"
      }
      {
        _id: "54fbb6205c67be8efadec91c"
        slug: "wont-work"
        maker: "Ipplehouse"
        name: "Wont Work"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        image:
          public_id: "ku7csk1bgagpxvxq1n8q"
          version: 1425782306
          signature: "f5df6c610c041307952265bc99cb79da6e8e6dc6"
          width: 270
          height: 270
          format: "jpg"
          resource_type: "image"
          url: "http://res.cloudinary.com/keystone-demo/image/upload/v1425782306/ku7csk1bgagpxvxq1n8q.jpg"
          secure_url: "https://res.cloudinary.com/keystone-demo/image/upload/v1425782306/ku7csk1bgagpxvxq1n8q.jpg"

        state: "public"
      }
      {
        _id: "54fc1d6a26b21c802a5d9ac0"
        slug: "tron"
        maker: "Other Guys"
        name: "Tron"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        content:
          brief: "I think this doll is something special"

        image:
          public_id: "sw3nd5x1uzyn80bs2dt9"
          version: 1425808748
          signature: "2500dbdfdca17e68bad87f01c181cde516080e41"
          width: 425
          height: 480
          format: "jpg"
          resource_type: "image"
          url: "http://res.cloudinary.com/keystone-demo/image/upload/v1425808748/sw3nd5x1uzyn80bs2dt9.jpg"
          secure_url: "https://res.cloudinary.com/keystone-demo/image/upload/v1425808748/sw3nd5x1uzyn80bs2dt9.jpg"

        state: "public"
      }
      {
        _id: "54fc1e5426b21c802a5d9ac1"
        slug: "chuck"
        maker: "Other Guys"
        name: "Chuck"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        content:
          brief: "Always a friend you can trust"

        image:
          public_id: "zhpjsfc3rqsp8xjaafyf"
          version: 1425808983
          signature: "38beff3be71362d7cd816ee90a36809c7adc277f"
          width: 300
          height: 310
          format: "jpg"
          resource_type: "image"
          url: "http://res.cloudinary.com/keystone-demo/image/upload/v1425808983/zhpjsfc3rqsp8xjaafyf.jpg"
          secure_url: "https://res.cloudinary.com/keystone-demo/image/upload/v1425808983/zhpjsfc3rqsp8xjaafyf.jpg"

        state: "public"
      }
      {
        _id: "54fc2a6569365e5f39d66fe8"
        slug: "john-hell"
        maker: "Other Guys"
        name: "John Hell"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        content:
          brief: "I'm in your yard..."

        image:
          public_id: "wvwst1t3zzyzi2y7k9u8"
          version: 1425812071
          signature: "149a79a9fa1e386d35f4479b1f89120b0c09bc48"
          width: 577
          height: 555
          format: "jpg"
          resource_type: "image"
          url: "http://res.cloudinary.com/keystone-demo/image/upload/v1425812071/wvwst1t3zzyzi2y7k9u8.jpg"
          secure_url: "https://res.cloudinary.com/keystone-demo/image/upload/v1425812071/wvwst1t3zzyzi2y7k9u8.jpg"

        state: "public"
      }
      {
        _id: "54fc2e17183b1a273f6d53b9"
        slug: "john-hell-1"
        maker: "Other Guys"
        name: "John Hell"
        owner:
          _id: "54e38ffc8d3aeee25bfcc648"
          isAdmin: true
          password: "$2a$10$1JbnrIbeYdPvEfcyI2W9K.mZe9FO8cCV91AC0ijFzczSGazgUMmAG"
          email: "halhenke@gmail.com"
          __v: 0
          name:
            last: "Johnson"
            first: "Don"

        __v: 0
        content:
          brief: "I'm in your yard..."

        image:
          public_id: "bqjo1gxd8fyamnsser7o"
          version: 1425813019
          signature: "3f9c932bc049d4c94718d80ac328c213a076af7a"
          width: 577
          height: 555
          format: "jpg"
          resource_type: "image"
          url: "http://res.cloudinary.com/keystone-demo/image/upload/v1425813019/bqjo1gxd8fyamnsser7o.jpg"
          secure_url: "https://res.cloudinary.com/keystone-demo/image/upload/v1425813019/bqjo1gxd8fyamnsser7o.jpg"

        state: "public"
      }
      {
        _id: "54fc84d2936aab8308a070c7"
        slug: "public-stamos-doll-54fc7723cd8fc8277ed35107"
        maker: "Ipplehouse"
        name: "Public Stamos Doll"
        owner:
          _id: "54fc7723cd8fc8277ed35107"
          email: "jonstamos@gmail.com"
          isAdmin: false
          password: "$2a$10$lkepufXXN.meCGHnJbqr7uINYrEMIJ0..3Bvxj4688muFXNao7MyO"
          location:
            country: "Australia"
            postcode: "2063"
            state: "NSW"
            street1: "100 Sailors Bay Road"
            suburb: "Northbridge"

          name:
            first: "Jon"
            last: "Stamos"

        __v: 0
        content:
          brief: "No - You Tell me"

        image:
          public_id: "bmkd8ef9d577u8hzstzr"
          version: 1425835220
          signature: "44ff04e5c150f49a645b280aab9a954585762df9"
          width: 444
          height: 504
          format: "jpg"
          resource_type: "image"
          url: "http://res.cloudinary.com/keystone-demo/image/upload/v1425835220/bmkd8ef9d577u8hzstzr.jpg"
          secure_url: "https://res.cloudinary.com/keystone-demo/image/upload/v1425835220/bmkd8ef9d577u8hzstzr.jpg"

        state: "public"
      }
    ]
    currentPage: 1
    totalPages: 2
    pages: [
      1
      2
    ]
    previous: false
    next: 2
    first: 1
    last: 10

  categories: []
