const path = require('path');

module.exports = {
  entry: './dist/tsc/src/main.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist', 'webpack'),
    filename: 'main.js',
    clean: true,
  },
};