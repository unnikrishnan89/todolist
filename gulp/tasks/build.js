var gulp = require('gulp'),
  props = require('../properties.js'),
  runSequence = require('run-sequence');

gulp.task('copyImages', function(done) {

  return gulp.src([
    '!' + props.langFolder + '/config',
    '!' + props.langFolder + '/pages/**/*',
    '!' + props.langFolder + '/pages',
    '!' + props.langFolder + '/pagelayout/**/*',
    '!' + props.langFolder + '/pagelayout',
    '!' + props.langFolder + '/components/**/*',
    '!' + props.langFolder + '/components',
    '!' + props.langFolder + '/styles/scss',
    '!' + props.langFolder + '/styles/**/*.scss',
    '!' + props.langFolder + '/styles/*.css',
    '!' + props.langFolder + '/bower_components',
    '!' + props.langFolder + '/scripts/main.js',
    '!' + props.langFolder + '/scripts/common.js',
    '!' + props.langFolder + '/**/*.html',
    props.langFolder + '/**/'
  ])
  .pipe(gulp.dest(props.outFolder.langFolder))
})

gulp.task('build', function(done) {
  runSequence(
    'clean',
    'sprite',
    'copyImages',
    'jade',
    'styles',
    done);
});
