var gulp = require('gulp'),
  props = require('../properties.js'),
  del = require('del');

gulp.task('clean', function() {
  del([
    props.distLang
  ]);
});
