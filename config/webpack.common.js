
var webpack = require('webpack')

var bannerText = `/**
* @name JSON Editor
* @description JSON Schema Based Editor
* This library is the continuation of jdorn's great work (see also https://github.com/jdorn/json-editor/issues/800)
* @version {{ VERSION }}
* @author Jeremy Dorn
* @see https://github.com/jdorn/json-editor/
* @see https://github.com/json-editor/json-editor
* @license MIT
* @example see README.md and docs/ for requirements, examples and usage info
*/`
module.exports = {
  entry: {
    // 'polyfills': './src/polyfills.ts',
    'jsoneditor': './src/core.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {

    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `eslint-loader`
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(bannerText.replace('{{ VERSION }}', JSON.stringify(require('../package.json').version)))
  ]
}
