var gulp = require('gulp'),
  gutil = require('gulp-util'),
  props = require('../properties.js'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  useref = require('gulp-useref');

gulp.task('copyassets', function(done) {

  return gulp.src([
      // '!app/en/index.html',
      '!app/admin/**/*.*',
      '!app/en/components/**/*.*',
      '!app/en/masterpage/**/*.*',
      '!app/en/pages/**/*.*',
      '!app/en/scripts/common.js',
      '!app/en/scripts/main.js',
      '!app/en/scripts/routing.js',
      '!app/en/images/**/*.png',
      '!app/en/images/**/*.jpg',
      '!app/en/styles/scss/*.*', 
      '!app/**/*.zip',
      'app/**/*.*',
      'app/data.json'
    ])
    .pipe(gulp.dest('assets_live/'))
});


gulp.task('imagesen', function(done) {

  return gulp.src([
      'app/en/images/**/*.{jpg,png}'
    ])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }, {
        cleanupIDs: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('assets_live/en/images/'))
})


gulp.task('htmlen', function(done) {
  return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('assets_live/en/'));
});


gulp.task('live', ['copyassets', 'imagesen'], function() {

})

//   var gulp = require('gulp'),
//       plumber = require('gulp-plumber'),
//       rename = require('gulp-rename');
//   var autoprefixer = require('gulp-autoprefixer');
//   var babel = require('gulp-babel');
//   var concat = require('gulp-concat');
//   var jshint = require('gulp-jshint');
//   var uglify = require('gulp-uglify');
//   var imagemin = require('gulp-imagemin'),
//       cache = require('gulp-cache');
//   var sass = require('gulp-sass');
//   var browserSync = require('browser-sync');
//
// gulp.task('live', function() {
//
// })
//

//
// gulp.task('styles', function(){
//   gulp.src(['src/styles/**/*.scss'])
//     .pipe(plumber({
//       errorHandler: function (error) {
//         console.log(error.message);
//         this.emit('end');
//     }}))
//     .pipe(sass())
//     .pipe(autoprefixer('last 2 versions'))
//     .pipe(gulp.dest('dist/styles/'))
//     .pipe(browserSync.reload({stream:true}))
// });
//
// gulp.task('scripts', function(){
//   return gulp.src('src/scripts/**/*.js')
//     .pipe(plumber({
//       errorHandler: function (error) {
//         console.log(error.message);
//         this.emit('end');
//     }}))
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('main.js'))
//     .pipe(babel())
//     .pipe(gulp.dest('dist/scripts/'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/scripts/'))
//     .pipe(browserSync.reload({stream:true}))
// });
