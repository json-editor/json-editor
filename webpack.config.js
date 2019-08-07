const path = require('path');

module.exports = {
  entry: './src/core.js',
  output: {
    filename: 'jsoneditor.js',
    path: path.resolve(__dirname, 'dist')
  }
};