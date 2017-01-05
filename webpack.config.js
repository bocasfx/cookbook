const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'app/static');
const APP_DIR = path.resolve(__dirname, 'app');

var config = {
  entry: [
    'babel-polyfill',
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      include : APP_DIR,
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react']
      }
    }]
  }
};

module.exports = config;