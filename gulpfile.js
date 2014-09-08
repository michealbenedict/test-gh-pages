var gulp   = require('gulp');
var gutil  = require('gulp-util');
var deploy = require("gulp-gh-pages");

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
    this.push(null);
  }
  return src;
}

gulp.task('generate:site', function () {
  string_src("index.html", (new Date()).toString())
  .pipe(gulp.dest("./dist"))
});

gulp.task('deploy', ['generate:site'], function () {
    gulp.src("./dist/**/*")
      .pipe(deploy(options));
});