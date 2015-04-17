gulp = require "gulp"
nodemon = require "gulp-nodemon"
livereload = require "gulp-livereload"
jshint = require "gulp-jshint"
jscs = require "gulp-jscs"
jshintReporter = require "jshint-stylish"
webpack = require "gulp-webpack"
cson = require "gulp-cson"
sourcemaps = require "gulp-sourcemaps"
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
    html: "./ng/templates/html/"
  react:
    # coffee: "./ng/**/*.coffee"
    # js: "./ng/**/*.js"
    in:
      jade: "./react/components/jade/**.jade"
      html: "./react/components/html/**.html"
      cjsx: "./react/components/cjsx/**.cjsx"
      jsx: "./react/components/jsx/**.jsx"
      js: "./react/components/js/**.js"
    out:
      compiled: "./react/components/js/"
      build: "./public/js/react/"
  bower: [
    # "bower/angular/angular.min.js"
    "bower/angular/angular.js"
    "bower/angular-route/angular-route.js"
  ]
  webpack:
    entry: [
      "./webpack.entry.ng.js"
      "./webpack.entry.react.js"
    ]
    config: "./webpack.config.js"
  jscs:
    json: "./.jscsrc.json"
    cson: "./.jscsrc.cson"


nodemonOpts =
  script: "keystone.js"
  ignore: [ "specs/*", "node_modules/**/*", "bower/**/*" ]
  # ext: "js coffee sass scss jade"
  ext: "js coffee sass scss"

# gulp lint
gulp.task "lint", ->
  return gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter))

gulp.task "jscs", ->
  return gulp.src(paths.src)
  .pipe jscs(configPath: paths.jscs.json )

gulp.task "jscs-cson", ->
  return gulp.src(paths.jscs.cson)
  .pipe cson()
  .pipe gulp.dest("./")

gulp.task "angular", ->
  return gulp.src(paths.ng.coffee)
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(concat("ng.js"))
    .pipe(sourcemaps.write("/maps"))
    .pipe(gulp.dest("public/js/ng"))

gulp.task "ng-jade", ->
  return gulp.src(paths.ng.jade)
    .pipe(jade())
    .pipe(ngTemplates("templates.js", standalone: true))
    .pipe(gulp.dest("public/templates"))

gulp.task "bower", ->
  return gulp.src(paths.bower)
    .pipe(sourcemaps.init())
    .pipe(concat("bower.js"))
    .pipe(sourcemaps.write("/maps"))
    .pipe(gulp.dest("public/js/"))

gulp.task "webpack", ->
  return gulp.src(paths.webpack.entry)
    .pipe(webpack(require(paths.webpack.config)))
    .pipe gulp.dest("public/js/")

gulp.task "watch", ->
  # gulp.watch paths.src, ['lint']
  # gulp.watch [paths.src, paths.jscs.json], ['jscs']
  gulp.watch [paths.src], ['jscs']
  gulp.watch paths.jscs.cson, ['jscs-cson']
  gulp.watch paths.ng.coffee, ['angular']
  gulp.watch paths.ng.jade, ['ng-jade']
  # gulp.watch paths.react.in.jade, ['react-jade']
  # gulp.watch [paths.webpack.config, paths.webpack.entry, paths.react.in.js], ['webpack']
  gulp.watch [paths.webpack.config, paths.webpack.entry, paths.react.in.jade, paths.react.in.cjsx], ['webpack']
  gulp.watch paths.jade, (event) ->
    livereload.reload()
  gulp.watch paths.bower, ['bower']

# gulp.task "nodemon", ['angular', 'ng-jade', 'react-jade', 'bower', 'webpack', 'watch'], ->
gulp.task "nodemon", ['angular', 'ng-jade', 'bower', 'webpack', 'jscs-cson', 'watch'], ->
  livereload.listen()
  nodemon(nodemonOpts)
    .on "restart", ->
      _.delay livereload.reload, 8000

gulp.task "default", ["nodemon"]
