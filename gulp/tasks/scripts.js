const gulp = require('gulp'),
  props = require('../properties.js'),
  path = require('path'),
  browserSync = require('browser-sync'),
  glob = require('glob'),
  $ = require('gulp-load-plugins')(),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  fs = require('fs')

var webpack = require('webpack-stream')

gulp.task('scripts', function () {
  var webPackConfig = require('../../webpack.config.js')
  var componentsPath = path.resolve(__dirname, '..', '..', 'app', 'en', 'components')
  var items = glob.sync(componentsPath + '/**/*.js')

  var exposeObj = {}
  var externalObj = {}
  items.forEach(function (val, index) {
    var expose = path.basename(val, '.js')
    var isExternal = /@external/.test(fs.readFileSync(val, 'utf-8'))
    if (isExternal) {
      externalObj[expose] = val
    }
    exposeObj[expose] = '../components/' + val.split('en' + '/components/')[1]
  })

  webPackConfig.resolve['alias'] = exposeObj
  webPackConfig.entry = Object.assign({}, externalObj, webPackConfig.entry)

  return gulp.src('en/scripts/*.js')
    .pipe(webpack(webPackConfig))
    .pipe(uglify())
    .pipe(gulp.dest(props.outFolder.scriptsFolderEn))
    .on('end', browserSync.reload)
})
