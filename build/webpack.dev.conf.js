var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');// 一个可以合并数组和对象的插件
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');// 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');// 用于更友好地输出webpack的警告、错误等信息
var path = require('path');

// add hot-reload related code to entry chunks
// 添加热重载相关的代码到多个chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 合并基础的webpack配置
var webpackConfig = merge(baseWebpackConfig, {
  // 配置样式文件的处理规则，使用styleLoaders
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // 配置Source Maps。在开发中使用cheap-module-eval-source-map更快
  devtool: '#cheap-module-eval-source-map',

  // 配置webpack插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ]
});

for(prop in webpackConfig.entry){
  console.log('[复制html]'+'/'+prop+'.html');
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: './'+prop+'.html',
      template: './src/'+prop+'.html',
      inject: true,
      chunks: [prop,'manifest', 'vendor']
    })
  );
}

module.exports = webpackConfig;
