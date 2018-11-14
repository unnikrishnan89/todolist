var gulp = require('gulp'),
  gutil = require('gulp-util'),
  fs = require('fs'),
  jade = require('gulp-pug'),
  jadeRaw = require('jade'),
  $ = require('gulp-load-plugins')(),
  props = require('../properties.js'),
  browserSync = require('browser-sync'),
  paths = require('path'),
  _ = require('lodash'),
  runSequence = require('run-sequence').use(gulp),
  depTreeObj = {},
  glob = require('glob'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  gulpif = require('gulp-if'),
  useref = require('gulp-useref')

var merge = require('merge-stream')

var lex = require('pug-lexer')
var parse = require('pug-parser')
var walk = require('pug-walk')
var load = require('pug-loader')

global.PAGES = {}
var debug_sources = []
var pathResolver = 'app/en/pages/'
var filePath = ''

var dependencies = []

// get dependency
function astWalk (pugFiles) {
  var ast = load.file(pugFiles, {
    lex: lex,
    parse: parse,
    resolve: function (filename, source) {
      filename = filename.trim()
      if (filename[0] !== '/' && !source)
        throw new Error('the "filename" option is required to use includes and extends with "relative" paths')

      if (filename[0] === '/' && !options.basedir)
        throw new Error('the "basedir" option is required to use includes and extends with "absolute" paths')

      filename = paths.join(filename[0] === '/' ? options.basedir : paths.dirname(source), filename)

      if (paths.basename(filename).indexOf('.') === -1) filename += '.jade'

      astWalk(filename)

      return filename
    },
    read: function (filename) {
      if (dependencies.indexOf(filename) < 0) {
        dependencies.push(filename)
      }
      var str = fs.readFileSync(filename, 'utf8')
      debug_sources[filename] = str
      return str
    }
  })

  return dependencies
}

// Parsing
gulp.task('pug', function () {
  return gulp.src(['app/en/pages/*.pug'])
    .pipe($.filter(function (pugFiles) {
      dependencies = []
      global.PAGES[pugFiles.path] = astWalk(pugFiles.path)
    }))
})

gulp.task('prejade', function () {
  var count = 0
  var item = glob.sync(props.compFolder + '/**/*.jade')

  var writePrecompile = function () {
    // console.log(paths.relative(item[count], 'app/en/masterpage/_mixin.jade'))
    var relMixinPath = paths.relative(item[count], 'app/en/masterpage/_mixin.jade')
    var jadeContent = fs.readFileSync(item[count], 'UTF-8')
    // jadeContent = "include "+ relMixinPath.replace('.jade','') + '\n\r'+ jadeContent
    jadeContent = 'include ' + 'app/en/masterpage/_mixin' + '\n\r' + jadeContent
    var compiledContent = jadeRaw.compileClient(jadeContent, {
      filename: paths.basename(item[count], '.jade').replace(/-/g, ''),
      name: paths.basename(item[count], '.jade').replace(/-/g, '')
    })

    // var content = jadeRaw.compileFileClient(item[count], {name: paths.basename(item[count], '.jade').replace('-','')})

    fs.writeFile(props.templateFolder + '/' + paths.basename(item[count], '.jade') + '.js', compiledContent, (err) => {
      if (err) throw err
      if (count < item.length) {
        writePrecompile()
        count++
        console.log(item[count])
      }
    })
  }
  writePrecompile()
// browserSync.reload
})

gulp.task('jade', function () {

  var enPages = gulp.src(props.jadeEnPages)
                    .pipe($.rename(function(file){
                      console.log(global.lang = 'en');
                    }))
                    .pipe($.plumber())
                    .pipe(jade({
                      locals: {},
                      pretty: true,
                      path: 'app'
                    }))
                    .pipe($.rename(function (file) {
                      gutil.log(
                        gutil.colors.bold('File changed : ') +
                        gutil.colors.green(file.basename)
                      )
                    }))
                    .on('error', function (e) {
                      gutil.log(e)
                      gutil.beep()
                      this.emit('end')
                    })
                    .pipe(useref({
                      searchPath: ''
                    }))
                    .pipe(gulpif('*.css', minifyCss()))
                    .pipe(gulp.dest(props.outFolder.langFolderEn))


  return enPages;

  // return gulp.src(props.jadeEnPages)
  //   .pipe($.plumber())
  //   .pipe(jade({
  //     locals: {},
  //     pretty: true,
  //     path: 'app'
  //   }))
  //   .pipe($.rename(function (file) {
  //     gutil.log(
  //       gutil.colors.bold('File changed : ') +
  //       gutil.colors.green(file.basename)
  //     )
  //   }))
  //   .on('error', function (e) {
  //     gutil.log(e)
  //     gutil.beep()
  //     this.emit('end')
  //   })
  //   .pipe(useref({
  //     searchPath: ''
  //   }))
  //   // .pipe(gulpif('*.js', uglify()))
  //   .pipe(gulpif('*.css', minifyCss()))
  //   .pipe(gulp.dest(props.outFolder.langFolderEn))
  //   .pipe($.rename(function(file){
  //     console.log(global.lang = 'ar');
  //   }))
  //   .pipe(gulp.dest(props.outFolder.langFolderAr))
  //   .on('end', function () {
  //     browserSync.reload()
  //   })
})
