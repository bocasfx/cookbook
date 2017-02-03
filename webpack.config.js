const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'app/static');
const APP_DIR = path.resolve(__dirname, 'app');

const PROD = (process.env.NODE_ENV === 'production');

var config = {
  entry: [
    'babel-polyfill',
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'cookbook.js'
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
  },
  plugins: PROD ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    })
  ] : []
};

module.exports = config;
