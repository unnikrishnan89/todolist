var gulp = require('gulp'),
  path = require('path'),
  gutil = require('gulp-util'),
  browserSync = require('browser-sync'),
  props = require('../properties.js'),
  runSequence = require('run-sequence').use(gulp);

  var isAr = props.lang == 'ar';


function logChanges(event) {
  gutil.log(
    gutil.colors.green('File ' + event.type + ': ') +
    gutil.colors.magenta(path.basename(event.path))
  );
}

function jadePathWatcher(event) {
  global['jadeChangeFile'] = event.path
}

function scssPathWatcher(event) {
  global['scssPathWatcher'] = event.path
}


gulp.task('watch', function() {
  gulp.watch([props.html]);
  var watcher = gulp.watch([props.scss], ['styles']);
  watcher.remove(props.scssFolder + '/main.scss');
  watcher.on('change', logChanges);
  watcher.on('change', scssPathWatcher);
  var jadeWatcher = gulp.watch(['source/**/*.pug'], ['jade']);
//   var langWatcher = gulp.watch(['app/lang.json'], ['readingLang']);
  jadeWatcher.on('change', jadePathWatcher);

  // var dataWatcher = gulp.watch(props.json, ['data']);
  // dataWatcher.on('change', logChanges);
gutil.colors.blue("-------------->",props.scriptsEn)

  var scriptWatcher = gulp.watch([
    props.scriptsEn + '/*.js',
    "!"+ props.scriptsEn + '/script.bundle.js',
    "!"+ props.scriptsEn + '/plugin.bundle.js',
    "!"+ props.scriptsEn + '/spotlight.bundle.js',
    "!"+ props.scriptsEn + '/events.bundle.js',
    props.compFolder + '/**/*.js',

  ], ['scripts']);

  scriptWatcher.on('change', logChanges);


 var assetsWatcher = gulp.watch(['source/images/**/*', 'source/styles/fonts/*'], ['copyAssets']);
 var spritesvgWatcher = gulp.watch(['source/images/icons-svg/**/*'], ['spritesvg']);




});
