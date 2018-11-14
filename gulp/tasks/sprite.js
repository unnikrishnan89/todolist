var gulp = require('gulp'),
  spritesmith = require('gulp.spritesmith'),
  $ = require('gulp-load-plugins')(),
  props = require('../properties.js');
  var isAr = props.lang == 'ar';
  var cssName = isAr ? '_sprite-ar.scss' : "_sprite.scss";

gulp.task('sprite', function() {
  // PNG icons
  var spriteData = gulp.src(props.spriteIcons).pipe($.plumber()).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: cssName,
    algorithm: 'binary-tree',
    padding: 20
  }));
  spriteData.img.pipe(gulp.dest(props.imagesFolder));
  spriteData.css.pipe(gulp.dest(props.scssFolderEn));
});
