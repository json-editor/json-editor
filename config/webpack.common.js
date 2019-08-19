var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
  entry: {
    // 'polyfills': './src/polyfills.ts',      
    'jsoneditor': './src/core.js',
  },
  resolve: {
    extensions: ['.js']
  },  
module: {
        rules: [
        
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
        // Workaround for angular/angular#11580
        /*
        new webpack.ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          helpers.root('./src'), // location of your src
          {} // a map of your routes
        )
        */
        /*
        ,
        new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'polyfills' ]
        })
        */
      ]    
};