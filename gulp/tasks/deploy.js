var gulp = require('gulp')
var props = require('../properties.js')
var runSequence = require('run-sequence')
var gutil = require('gulp-util')
var del = require('del');

gulp.task('copyAll', function (done) {
  gutil.log('Copy all soure folder', gutil.colors.magenta(props.langFolder))
  gutil.log('Copy all dist folder', gutil.colors.green(props.distLang))
  return gulp.src([
    'app/**/*'
  ])
    .pipe(gulp.dest(props.distLang))
})

gulp.task('deploy', function (done) {
  del(['./dist/**/*']);
  runSequence(
    'sprite',
    'spritesvg',
    'jade',
    'scripts',
    'styles',
    'copyAssets',
    'copyAll',
    done)
})
