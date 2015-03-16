gulp = require "gulp"
nodemon = require "gulp-nodemon"
livereload = require "gulp-livereload"
jshint = require "gulp-jshint"
jshintReporter = require "jshint-stylish"
webpack = require "gulp-webpack"
_ = require "lodash"
watch = require "gulp-watch"
# For Angular
coffee = require "gulp-coffee"
concat = require "gulp-concat"
jade = require "gulp-jade"
ngTemplates = require "gulp-angular-templatecache"


#
# * Create variables for our project paths so we can change in one place
#
paths =
  src: [
    "./models/**/*.js"
    "./routes/**/*.js"
    "keystone.js"
    "package.json"
    ]
  jade: "./templates/**/*.jade"
  ng:
    coffee: "./ng/**/*.coffee"
    js: "./ng/**/*.js"
    jade: "./ng/templates/**/*.jade"
  bower: [
    # "bower/angular/angular.min.js"
    "bower/angular/angular.js"
    "bower/angular-route/angular-route.js"
  ]

nodemonOpts =
  script: "keystone.js"
  # ext: "js coffee sass scss jade"
  ext: "js coffee sass scss"

# gulp lint
gulp.task "lint", ->
  return gulp.src(paths.src)
    .pipe(jshint())
    .reporter(jshintReporter)

gulp.task "angular", ->
  return gulp.src(paths.ng.coffee)
    .pipe(coffee())
    .pipe(concat("ng.js"))
    .pipe(gulp.dest("public/js/ng"))

gulp.task "ng-jade", ->
  return gulp.src(paths.ng.jade)
    .pipe(jade())
    .pipe(ngTemplates("templates.js", standalone: true))
    .pipe(gulp.dest("public/templates"))

gulp.task "bower", ->
  return gulp.src(paths.bower)
    .pipe(concat("bower.js"))
    .pipe(gulp.dest("public/js/"))

# gulp watcher for lint
gulp.task "watch:lint", ->
  return gulp.src(paths.src)
    .pipe(watch())
    .pipe(jshint())
    .reporter(jshintReporter)

gulp.task "watch", ->
  gulp.watch paths.ng.coffee, ['angular']
  gulp.watch paths.ng.jade, ['ng-jade']
  gulp.watch paths.jade, (event) ->
    livereload.reload()
  gulp.watch paths.bower, ['bower']

gulp.task "nodemon", ['angular', 'ng-jade', 'bower', 'watch'], ->
  livereload.listen()
  nodemon(nodemonOpts)
    .on "restart", ->
      _.delay livereload.reload, 8000

gulp.task "default", ["nodemon"]
