var path = require('path'),
  gutil = require('gulp-util');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var projPaths = {
  autoPrefix: AUTOPREFIXER_BROWSERS,
  comp: 'components',
  dist: 'dist',
  app: 'app',
  scssRelative: '**/*.scss',
  jadeEnPages: 'source/pages/*.pug',
  langFolderEn: path.join('app', 'en'),
  langFolderAr: path.join('app', 'ar'),
  get root(){
    return __dirname.replace('gulp', '');
  },
  get outFolder() {

    var outFolder = gutil.env._[0] !== 'build' ? 'app' : 'dist';
    outFolder = gutil.env._[0] == 'zip' ? 'dist' : 'app';

    gutil.log(
      gutil.colors.green("Current output folder: " + outFolder)
    )

    return {
      styles: path.join(outFolder, this.lang, 'styles'),
      stylesEn: path.join(outFolder, 'en', 'styles'),
      stylesAr: path.join(outFolder, 'ar', 'styles'),
      langFolder: path.join(outFolder, this.lang),
      langFolderEn: path.join(outFolder, 'en'),
      langFolderAr: path.join(outFolder, 'ar'),
      imagesFolder: path.join(outFolder, this.lang, 'images'),
      scriptsFolder: path.join(outFolder, this.lang, 'scripts'),
      scriptsFolderEn: path.join(outFolder, 'en', 'scripts'),
      scriptsFolderAr: path.join(outFolder, 'ar', 'scripts')
    }

  },
  get distLang() {
    return path.join('dist');
  },
  get styles() {
    return path.join('source', 'styles');
  },
  get scssFolder() {
    return path.join('source', 'styles', 'scss');
  },
  get scssFolderEn() {
    return path.join('app', 'en', 'styles', 'scss');
  },
  get scripts() {
    return path.join('app', this.lang, 'scripts');
  },
  get scriptsEn() {
    return path.join('source', 'scripts');
  },
  get scss() {
    return path.join('source', '**', '*.scss');
  },
  get mainScss() {
    return path.join('source', 'styles', 'scss', 'main.scss')
  },
  get pageScss() {
    return path.join('source', 'styles', 'scss', '*.scss')
  },
  get compFolder() {
    return path.join('source', 'components')
  },
  get compScss() {
    return path.join('source', 'components', '**', '*.scss')
  },
  get html() {
    return path.join('app', this.lang, '/*.html')
  },
  get selectedScss() {
    return gutil.env.selectedScss ? true : false
  },
  get selectedScssFile() {
    return path.join('app', this.lang, '.selectedscss.js')
  },
  get lang() {
    return gutil.env.ar ? 'ar' : 'en'
  },
  get spriteIcons() {
    return path.join('app', this.lang, 'images', 'icons', '*.png')
  },
  get spriteSvg() {
    return path.join('source', 'images', 'icons-svg', '*.svg')
  },
  get imagesFolder() {
    return path.join('app', this.lang, 'images')
  },
  get langFolder() {
    return path.join('app', this.lang)
  },
  get sourceFolder() {
    return path.join('source')
  },
  set lang(lang) {
    this.lang = lang
  },
  get jadeFiles() {
    return path.join('app', this.lang, '**', '*.jade')
  },
  get jadePages() {
    return path.join('./', 'app', this.lang, 'pages', '*.jade')
  },
  get jadePagesPath() {
    return path.join('app', this.lang, 'pages')
  },
  get zipFolder() {
    return path.join('zip', this.lang)
  },
  get zipFilename() {
    return "archive.zip"
  },
  get getSyncFolders() {
    return gutil.env.syncfolders && gutil.env.syncfolders.split(',')
  },
  get translation() {
    return path.join('app', 'lang.json')
  },
  get json() {
    return [path.join('app', 'en', 'components' ,'**', '*.json'), path.join('app', 'en', 'pages' ,'**', '*.json')];
  },
  get data() {
    return path.join('app', 'data.json');
  },
  get templateFolder() {
    return path.join('app', this.lang, 'template')
  },

}

global.lang = projPaths.lang;

module.exports = projPaths;
