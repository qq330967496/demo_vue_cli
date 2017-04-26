var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
var glob = require('glob');
var webpack = require('webpack');

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
  // entry: {
  //   app: './src/main.js'
  // },
  entry:getEntry(),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ]
  },
  //插件项
  plugins: [
    new webpack.ProvidePlugin({
      '$'   : 'n-zepto',
      'utils': resolve('src')+"/assets/lib/utils.js",
    }),
  ]
};
