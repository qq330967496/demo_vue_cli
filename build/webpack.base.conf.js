var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir).replace(/\\/g,'/')
}
// 多入口文件
function getEntry(){
  var entrys = {};
  glob.sync(resolve('src')+'/module/**/*.js').forEach(function(name) {
    name = name.replace(resolve('src/'),'./src/');
    // 前缀
    var entry = name.replace('./src/','');
    // 后缀
    entry = entry.replace(/\.js/, "");
    entrys[entry] = name;

    console.log(entry+" : "+name);

  });
  return entrys;
};

var webpackConfig = {
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
      '@': resolve('src')
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
      }
    ],
  },
  plugins:[]
}

for(prop in webpackConfig.entry){
  console.log(prop);
  // 复制html
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename:path.resolve(__dirname, '../dist/'+prop+'.html'),
      template: './src/'+prop+'.html',
      inject: true,
    })
  )
}

module.exports = webpackConfig;
