
// eslint-disable-next-line no-undef
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
      // Tried using jslint-loader but it creates an error
      // repo is archived and marked as deprecated in favour of eslint
      /*
      {
        test: /.js/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: `jshint-loader`,
            options: {
              // browser: true,
              // indent: 2,
              // devel:true,
              // nonbsp: true,
              // nonew: true,
              // immed: true,
              // latedef: true,
              // globals: {
              //     "module": true,
              //     "define": true,
              // }
        
            }
          }
        ]
      },   
       */

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `eslint-loader`,
        options: {
          // configFile: helpers.root('config/.eslintrc')              
        }            
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
  ],    
};