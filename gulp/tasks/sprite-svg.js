var gulp = require('gulp'),
    svgstore = require('gulp-svgstore'),
    $ = require('gulp-load-plugins')(),
    svgmin = require('gulp-svgmin'),
    path = require('path'),
    props = require('../properties.js'),
    re = /<svg([^>]*)>/g,
    subst = '<svg $1 id="l-icon-svg">'


gulp.task('spritesvg', function() {

    return gulp
            .src(props.spriteSvg)
            .pipe(svgstore())
            .pipe($.replace(/<defs>[\s\S]*<\/defs>/g, ''))
            .pipe($.replace(re, subst))
            .pipe(gulp.dest(props.imagesFolder));

});