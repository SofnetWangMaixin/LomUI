const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../public')
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true
  }
});