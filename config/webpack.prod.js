const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const RemoveStrictPlugin = require('remove-strict-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')

const ENV = (process.env.NODE_ENV = process.env.ENV = 'production')

function createConfig (target) {
  filenameInsert = target === 'var' ? '.' : '.' + target + '.';
  commonConfig.module.rules = [
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: `eslint-loader`
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: false,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [
              require('cssnano')({
                preset: 'default'
              })
            ]
          }
        }
      ]
    }
  ]

  return webpackMerge(commonConfig, {
    mode: 'production',
    output: {
      path: helpers.root('dist'),
      publicPath: '/dist/',
      filename: '[name]' + filenameInsert + 'js',
      chunkFilename: '[id]' + filenameInsert + 'chunk.js',
      libraryTarget: target
    },

    optimization: {
      minimize: true
    },

    plugins: [
      new RemoveStrictPlugin(), // I have put this in to avoid IE throwing error Assignment to read-only properties is not allowed in strict mode
      // This doesn't seem to actually be minimising the CSS!
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          ENV: JSON.stringify(ENV)
        }
      })
    ],

    devServer: {
      contentBase: helpers.root('.'),
      historyApiFallback: true,
      stats: 'minimal',
      port: 8080
    }
  })
}

module.exports = [
  createConfig('var'),
  createConfig('amd'),
  createConfig('commonjs2')
]
