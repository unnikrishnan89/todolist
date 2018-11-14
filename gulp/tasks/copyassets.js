var gulp = require('gulp')
var props = require('../properties.js')
var runSequence = require('run-sequence')
var gutil = require('gulp-util')
var del = require('del')

gulp.task('copyAssets', function (done) {

  runSequence(
    'copyBase',
    'copyImagesEn',
    done);

})

gulp.task('copyBase', function (done) {

  del([
    props.langFolder + "/images",
    props.langFolder + "/styles/fonts"
  ])

  gutil.log('Copy Images and Font', gutil.colors.magenta("from Source folder to Lang folder!"))
  return gulp.src([
    '!' + props.sourceFolder + '/config',
    '!' + props.sourceFolder + '/pages/**/*',
    '!' + props.sourceFolder + '/pages',
    '!' + props.sourceFolder + '/pagelayout/**/*',
    '!' + props.sourceFolder + '/pagelayout',
    '!' + props.sourceFolder + '/masterpage/**/*',
    '!' + props.sourceFolder + '/masterpage',
    '!' + props.sourceFolder + '/components/**/*',
    '!' + props.sourceFolder + '/components',
    '!' + props.sourceFolder + '/styles/scss',
    '!' + props.sourceFolder + '/styles/**/*.scss',
    '!' + props.sourceFolder + '/bower_components',
    '!' + props.sourceFolder + '/scripts/common.js',
    '!' + props.sourceFolder + '/scripts/main.js',
    '!' + props.sourceFolder + '/scripts/plugin.js',
    '!' + props.sourceFolder + '/images/en/',
    '!' + props.sourceFolder + '/images/en/**/*',
    '!' + props.sourceFolder + '/images/ar/',
    '!' + props.sourceFolder + '/images/ar/**/*',
    props.sourceFolder + '/**/'
  ])
    .pipe(gulp.dest(props.langFolder))
})

gulp.task('copyImagesEn', function (done) {
  return gulp.src([props.sourceFolder+'/images/en/**.*'])
  .pipe(gulp.dest(props.langFolderEn+'/images/'))
})


