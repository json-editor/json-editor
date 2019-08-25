var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const RemoveStrictPlugin = require('remove-strict-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    path: helpers.root('dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  optimization:{
    // Enabling splitChunks seems to stop the global JSONEditor object being set
    /*
    splitChunks:{
      chunks:'all'
    },
    */
    minimize:true
  },

  plugins: [
    new CleanWebpackPlugin({ // Clean all but dev subdirectory before building
      cleanOnceBeforeBuildPatterns: ['**/*', 
       // '!dev/**/*'      // doesn't work
       '!dev/**'      // works
      ],      
    }), 
    new RemoveStrictPlugin(),           // I have put this in to avoid IE throwing error Assignment to read-only properties is not allowed in strict mode
    // This doesn't seem to actually be minimising the CSS!
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      }/*,
      canPrint: true*/
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),  
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })    
  ],

  devServer: {
    contentBase: helpers.root('.'),
    historyApiFallback: true,
    stats: 'minimal',
    port:8080
  }

});