const helpers = require('./helpers')
const CssToJSON = require('../build/CssToJson')

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'

      }
    ]
  },
  plugins: [
    new CssToJSON({
      pattern: './src/themes/*.css',
      jsonPattern: './src/themes/*.json'
    })
  ]
}
