var webpack = require('webpack');
var path = require('path');
var config = {
  entry: './src/index.js',
  output: {
    filename: 'plotit.js',
    path: path.resolve('./build/'),
    libraryTarget: 'var',
    library: 'Plotit' 
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
    }]
  }
};

module.exports = config;
