const webpackMerge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')

// See https://webpack.js.org/guides/development/
module.exports = (env) => webpackMerge(commonConfig, {
  mode: 'development',
  devtool: '@source-map',
  output: {
    path: env && env.travis === true ? helpers.root('dist') : helpers.root('dist/nonmin'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin() // Cleans directory before building
  ]
})
