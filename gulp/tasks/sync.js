var gulp = require('gulp'),
  path = require('path'),
  gutil = require('gulp-util'),
  props = require('../properties.js'),
  conflict = require("gulp-conflict");

gulp.task('sync', function(done) {
  gulp.src([props.getSyncFolders[0] + '/**/*'])
  .pipe(conflict(props.getSyncFolders[1], {defaultChoice: 'd'}))
  .pipe(gulp.dest(props.getSyncFolders[1]));
});
