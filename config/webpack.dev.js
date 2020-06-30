/* eslint-disable no-undef */
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('dist/dev'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'umd'
  }
})
