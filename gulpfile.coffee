gulp = require("gulp")
nodemon = require("gulp-nodemon")
livereload = require("gulp-livereload")
jshint = require("gulp-jshint")
jshintReporter = require("jshint-stylish")
_ = require "lodash"
watch = require("gulp-watch")

#
# * Create variables for our project paths so we can change in one place
#
paths = src: [
  "./models/**/*.js"
  "./routes/**/*.js"
  "keystone.js"
  "package.json"
]

nodemonOpts =
  script: "keystone.js"
  ext: "js coffee sass scss jade"

# gulp lint
gulp.task "lint", ->
  gulp.src(paths.src)
    .pipe(jshint())
    .reporter(jshintReporter)
  return


# gulp watcher for lint
gulp.task "watch:lint", ->
  gulp.src(paths.src)
    .pipe(watch())
    .pipe(jshint())
    .reporter(jshintReporter)
  return

gulp.task "nodemon", ->
  livereload.listen()
  nodemon(nodemonOpts)
    .on "restart", ->
      _.delay livereload.reload, 8000

gulp.task "default", ["nodemon"]
