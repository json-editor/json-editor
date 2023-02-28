const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const RemoveStrictPlugin = require('remove-strict-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')

module.exports = () => {
  return webpackMerge(commonConfig, {
    mode: 'production',
    output: {
      path: helpers.root('dist'),
      publicPath: '/dist/',
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    optimization: {
      minimize: true
    },
    plugins: [
      // This doesn't seem to actually be minimising the CSS!
      new webpack.NoEmitOnErrorsPlugin()
    ]
  })
}
