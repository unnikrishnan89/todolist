var gulp = require('gulp'),
  gutil = require('gulp-util'),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence').use(gulp),
  props = require('../properties.js'),
  join = require('path').join,
  historyApiFallback = require('connect-history-api-fallback');

var url = require('url');
var portNo = 3000;
gulp.task('serve', function() {
  browserSync({
    notify: false,
    open: gutil.env.notab ? false : true,
    port: portNo,
    ghostMode: false,
    server: {
      baseDir: [props.app],
      directory: gutil.env.dir ? false : true,
      ghostMode: false
    }
  });

  // gulp.start('watch');
  // 'spritesvg',

  runSequence(
    'copyAssets',
    'jade',
    'styles',
    'spritesvg',
    'watch'
  )

  //   runSequence(
  //     'watch'
  //   )

});
