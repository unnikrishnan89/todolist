var props = require('./gulp/properties.js')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname + '/app',
  entry: {
    script: __dirname + '/' + props.scriptsEn + '/main.js',
    plugin: __dirname + '/' + props.scriptsEn + '/plugin.js'
  },
  output: {
    path: path.join(__dirname, 'app', props.lang, 'scripts'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'string-replace',
      query: {
        search: 'GLOBALLANG',
        replace: props.lang,
        flags: 'gi'
      }
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      include: __dirname + '/app' + props.lang,
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime', new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
        ],
        cacheDirectory: true
      }
    }
    ]
  },
  resolve: {}

}
