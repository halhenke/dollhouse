gulp = require("gulp")
jshint = require("gulp-jshint")
jshintReporter = require("jshint-stylish")
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

# gulp lint
gulp.task "lint", ->
  gulp.src(paths.src).pipe(jshint()).pipe jshint.reporter(jshintReporter)
  return


# gulp watcher for lint
gulp.task "watch:lint", ->
  gulp.src(paths.src).pipe(watch()).pipe(jshint()).pipe jshint.reporter(jshintReporter)
  return
