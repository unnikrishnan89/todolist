const gulp = require('gulp'),
  sitespeedio = require('gulp-sitespeedio'),
  props = require('../properties.js'),
  glob = require('glob');

  var portNo =  3000;

gulp.task('perf', function (done) {
  let pages = glob.sync('app/' + lang + '/**/*.html');
  let allpages = pages.map(function(item, index){
    return ['http://localhost:', portNo, item.replace('app/'+lang,'')].join('')
  })
  sitespeedio({
    urls: allpages,
    depth: 2,
  })(done)
})