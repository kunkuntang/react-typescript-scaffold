const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const webpack = require('webpack')
const { assetsPath, resolve } = require('./utils')
const config = require('./config')

// 用于自动生成html,并默认将打包生成的js、css引入到html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 使用mini-css-extract-plugin来将css从js里分离出来，并且支持chunk css。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 用于清除本地文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 在webpack打包时优化压缩css代码，主要使用 cssnano 压缩器
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 用来压缩 js 代码，之前用到的是 uglifyjs-webpack-plugin 这一个，但是它好像需要 babel 的支持，而且现在官方推荐用 terser-webpack-plugin，
const TerserPlugin = require('terser-webpack-plugin')
/**
 * 打包生成的 runtime.js非常的小，
 * gzip 之后一般只有几 kb，但这个文件又经常会改变，
 * 我们每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，
 * 所以建议不要将它单独拆包，有关优化就是将他将它内联到我们的 index.html 之中。这里使用了 script-ext-html-webpack-plugin。
 */
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
// 我们使用它来将给定的静态资源css或者js引入到html-webpack-plugin生成的html文件中。
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const DLL_PATH = '../dll'

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name][chunkhash].js',
    path: resolve('../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 去掉多余空白
        removeAttributeQuotes: true // 去掉一些属性的引号，例如id="moo" => id=moo
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: assetsPath('css/[name].[contenthash].css'),
      chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
    }),
    new CleanWebpackPlugin(),
    // 注意一定要在HtmlWebpackPlugin之后引用
    // inline 的name 和你 runtimeChunk 的 name保持一致
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    // 告诉 Webpack 使用了哪些动态链接库
    new webpack.DllReferencePlugin({
      manifest: resolve(`../dll/vendor.manifest.json`)
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve(`${DLL_PATH}/**/*.js`),
      includeSourcemap: false
    }),
  ],
  optimization: { // 性能配置
    // ...
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'), // 使用 cssnano 压缩器
        cssProcessorOptions: {
          reduceIdents: false,
          autoprefixer: false,
          safe: true,
          discardComments: {
            removeAll: true
          }
        }
      }),
      new TerserPlugin({
        cache: true,
        // parallel: true,
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'] // 移除console
          }
        },
        sourceMap: true
      }),
    ],
    /**
     * 它可以将包含chunks 映射关系的 list单独从 app.js里提取出来，
     * 因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，
     * 如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了。
     * 在 webpack4 中，无需手动引入插件，配置 runtimeChunk 即可。
     */
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async', // 提取的 chunk 类型，all: 所有，async: 异步，initial: 初始
      // minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
      // maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
      // minChunks: 1, // 默认值，新 chunk 被引用的最少次数
      // maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
      // maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
      // name: true, // 默认值，控制 chunk 的命名
      cacheGroups: { // 配置缓存组
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: 10, // 优先级
          reuseExistingChunk: false, // 允许复用已经存在的代码块
          test: /node_modules\/(.*)\.js/, // 只打包初始时依赖的第三方
        },
        common: {
          name: 'common',
          chunks: 'initial',
          // test: resolve("src/components"), // 可自定义拓展你的规则
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
}

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseConfig, prodConfig)