var gulp = require('gulp'),
  gutil = require('gulp-util'),
  grep = require('gulp-grep'),
  props = require('../properties.js'),
  path = require('path'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  $ = require('gulp-load-plugins')(),
  runSequence = require('run-sequence').use(gulp),
  browserSync = require('browser-sync'),
  selectedScssFile = props.selectedScss ? require(props.selectedScssFile) : '',
  rtlcss = require('gulp-rtlcss'),
  postcss = require('gulp-postcss');

  var fs = require('fs');



var compCss = [],
  excludeSCSSFiles = grep(function(file) {
    // console.log(file);
    return !file["_contents"].toString().match(/@external/);
  });

gulp.task('styles:external', function() {

  if (props.selectedScss) {
    return gulp.src(selectedScssFile)
      .pipe(excludeSCSSFiles)
      .pipe(gutil.buffer(function(err, files) {
        console.log(files[0].base, files[0].history);
      }))

  } else {
    var files = props.compScss;
    return gulp.src([files])
      .pipe(excludeSCSSFiles)
      .pipe(rename(function(path) {
        // console.log(path);
        compCss.push('@import "../components/' + path.dirname + "/" + path.basename + '"');
      }))
  }
});

gulp.task('styles:mainscss', ['styles:external'], function() {

  var compCssItems = compCss.join(';\n') + '';
  var regExp = /(\/\*.*@import start.*\*\/)([\s\S]*)(\/\*.*@import end.*\*\/)/;
  var string = '/*@import start*/\n{{val}}\n/*@import end*/';

  gulp.src([props.mainScss])
    .pipe(replace(regExp, function(file) {
      return string.replace('{{val}}', compCssItems)
    }))
    .pipe(gulp.dest(props.scssFolder))

});

runSequence('styles:mainscss');

var rtlcssCommentProcess = function(css, opts) {
  return css.walkComments(function(comment, index) {
    if (comment.text.indexOf('rtl:') == 0) {
      comment.raws.before = "";
      var replaceValue = comment.parent.nodes[index - 1].value + '/*' + comment.text + '*/';
      comment.parent.nodes[index - 1].value = replaceValue;
    }
  })
}

gulp.task('styles', function() {

  var isAr = props.lang == 'ar';
  var processors = [rtlcssCommentProcess];

  return gulp.src(props.pageScss)
    .pipe($.plumber())
    .pipe($.if(isAr, replace("scss/sprite", "scss/sprite-ar")))
    .pipe($.rename(function(file) {
      gutil.log(
        gutil.colors.bold('File changed : ') +
        gutil.colors.green(file.basename)
      );
    }))
    .pipe($.sass({
      outputStyle: 'expanded',
      includePaths: [props.styles],
      precision: 10,
      sourceComments: false,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer({
      browsers: props.autoPrefix
    }))
    .pipe(gulp.dest(props.outFolder.stylesEn))
    .pipe(postcss(processors))
    .pipe($.size({
      title: 'styles'
    }))
    .on('end', browserSync.reload);
});
