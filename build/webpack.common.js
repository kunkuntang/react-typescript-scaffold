const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const theme = require('../src/assets/antdTheme')

function resolve(relatePath) {
  return path.join(__dirname, relatePath);
}
module.exports = {
  entry: resolve('../src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: resolve('../dist')
  },
  module: {
    rules: [{
      test: /\.(j|t)sx?$/,
      include: resolve('../src'),
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      include: resolve('../node_modules'),
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: theme
          }
        }
      ]
    }, {
      test: /\.scss$/,
      include: resolve('../src'),
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            includePaths: [resolve('../src/styles')]
          }
        }
      ]
    }, {
      test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
        {
        loader: 'url-loader',
        options: {
          //1024 == 1kb  
          //小于10kb时打包成base64编码的图片否则单独打包成图片
          limit: 10240,
          name: path.join('img/[name].[hash:7].[ext]')
        }
      }]
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: path.join('font/[name].[hash:7].[ext]')
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve('../src'),
      '@ant-design/icons/lib/dist$': resolve('../src/icons.ts'),
      '@components': resolve('../src/components'),
      '@img': resolve('../src/assets/img')
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    overlay: {
      errors: true
    },
    inline: true,
    hot: true,
  }
}