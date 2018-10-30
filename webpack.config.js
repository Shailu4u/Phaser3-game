var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


var definePlugin = new webpack.DefinePlugin({
  WEBGL_RENDERER: true,
  CANVAS_RENDERER: false
})

module.exports = {
  entry: {
    index: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/index.js')
    ],
    vendor: ['phaser']
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  watch: false,
  plugins: [
    definePlugin,
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      chunks: ['vendor', 'index'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: "./public"
      }
    }),
    new CopyWebpackPlugin([ { from:  path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'public/assets') } ])
  ],
  module: {
    rules: [
      {
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
      },
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
    ]
  }
}