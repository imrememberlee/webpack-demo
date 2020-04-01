/*
 * @Description: webpack配置文件
 * @Author: mengbin.li
 * @Date: 2020-03-30
 * @LastEditors: mengbin.li
 * @LastEditTime: 2020-04-01
 */

const HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 静态文件复制
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
console.log(config)
module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: 'bundle.[hash:6].js',
    publicPath: '/' //通常是CDN地址
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/ //排除 node_modules 目录
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, //替换之前的 style-loader
          'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({
                    "overrideBrowserslist": [
                      "defaults"
                    ]
                  })
                ]
              }
            }
          }, 'less-loader'
        ],
        exclude: /node_modules/
      },
      // {
      //     test: /.html$/,
      //     use: 'html-withimg-loader'
      // },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
  plugins: [
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      config: config.template
      // hash: true //是否加上hash，默认是 false
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/js/*.js',
        to: path.resolve(__dirname, 'dist', 'js'),
        flatten: true,
      }
    ], {
      ignore: ['other.js']
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      Component: ['react', 'Component'],
      // Vue: ['vue/dist/vue.esm.js', 'default'],
      // $: 'jquery',
      _map: ['lodash', 'map']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
      //个人习惯将css文件放在单独目录下
      //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath 
    }),
    new OptimizeCssPlugin(),
    new webpack.HotModuleReplacementPlugin() //热更新插件
  ],
  devServer: {
    hot: true
  },
}