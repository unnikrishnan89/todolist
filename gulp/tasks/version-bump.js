var gulp = require('gulp'),
  path = require('path'),
  gutil = require('gulp-util'),
  props = require('../properties.js'),
  fs = require('fs')

var newVersion = gutil.env.ver || 0;

  gulp.task('versionbump', function(next) {
    fs.writeFileSync('source/humans.txt', newVersion + 'v');
    console.log('path = app/' + props.lang +'/', ' && version = ', newVersion)
    next()
  });
