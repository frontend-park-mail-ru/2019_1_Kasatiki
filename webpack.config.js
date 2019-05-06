const path = require('path');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const _entry = [
  './static/index.js',
  './static/index.scss',
]

const output = {
  path: path.resolve(__dirname, 'static'),
  filename: 'bundle.js'
}

const _ruleBundleJs = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

const _ruleBundleCss = {
  test: /\.scss$/,
  use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
  ]
}

const _module = {
  rules: [
    _ruleBundleCss,
    _ruleBundleJs,
  ]
}

const extractSass = new MiniCssExtractPlugin({
  filename: 'index.css',
})

module.exports = {
  mode: 'development',
  entry: _entry,
  output,
  module: _module,
  devtool: "source-map",

  plugins: [
    extractSass,
    new webpack.LoaderOptionsPlugin({
      options: {
          postcss: [
              autoprefixer()
          ]
      }
    })
  ]
}
