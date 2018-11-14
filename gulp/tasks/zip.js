var gulp = require('gulp'),
  props = require('../properties.js'),
  runSequence = require('run-sequence'),
  $ = require('gulp-load-plugins')(),
  zip = require('gulp-zip');

  gulp.task('zipDist', function() {
    return gulp.src(props.outFolder.langFolder + '/**/*')
        .pipe(zip(props.zipFilename, false))
        .pipe(gulp.dest(props.zipFolder));
  });

gulp.task('zip', function(done) {
  runSequence(
    'build',
    'zipDist',
    done);
});
