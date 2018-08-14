const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './createElement.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};