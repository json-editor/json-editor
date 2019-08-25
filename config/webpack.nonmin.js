var webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

// See https://webpack.js.org/guides/development/
module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: '#@source-map', 
  output: {
    path: helpers.root('dist/nonmin'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new CleanWebpackPlugin(), // Cleans directory before building
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),  
  ],

  
  devServer: {
    contentBase: helpers.root('.'),
    historyApiFallback: true,
    // stats: 'minimal',
    port:8080
  }
});