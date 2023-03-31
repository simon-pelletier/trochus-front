const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'), // source files
  src: path.resolve(__dirname, '../src'), // source files
  sass: path.resolve(__dirname, '../sass'), // sass files
  assets: path.resolve(__dirname, '../src/assets'), // assets files
  build: path.resolve(__dirname, '../public/js'), // development build files
  buildDev: path.resolve(__dirname, '../dist'), // production dev files
  static: path.resolve(__dirname, '../public'), // static files to copy to build folder
};