var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
var glob = require('glob');
var webpack = require('webpack');

// 给出正确的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

// 多入口文件
function getEntry(){
  var entrys = {};

  glob.sync('./src/module/**/*.js').forEach(function(name) {
    var entry = name.replace('./src/module/','').split('/')[0];
    var prop = 'module/'+entry+'/'+entry;
    entrys[prop] = name;
    console.log('[入口]' + prop+" : "+name);
  });
  return entrys;
};

module.exports = {
  // 配置webpack编译入口
  // entry: {
  //   app: './src/main.js'
  // },
  entry:getEntry(),
  // 配置webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 配置模块resolve的规则
  resolve: {
    // 自动resolve的扩展名
    extensions: ['.js', '.vue', '.json'],
    // 创建路径别名，有了别名之后引用模块更方便，例如
    // import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // 配置不同类型模块的处理规则
  module: {
    rules: [
      {// 对所有.vue文件使用vue-loader
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {// 对src和test文件夹下的.js文件使用babel-loader
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {// 对图片资源文件使用url-loader，query.name指明了输出的命名规则
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {// 对字体资源文件使用url-loader，query.name指明了输出的命名规则
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {// 对所有.scss文件使用style,css,sass
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ]
  },
  //插件项
  plugins: [
    // 定义全局插件，无需再引入
    new webpack.ProvidePlugin({
      // zepto必须使用npm版本的zepto，否则会出现window=null的情况
      '$'   : 'n-zepto',
      'utils': resolve('src')+"/assets/lib/utils.js",
    }),
  ]
};
