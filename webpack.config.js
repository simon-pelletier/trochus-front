/* eslint-disable import/order */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./config/paths');
const dotenv = require('dotenv-flow').config({
  path: path.join(paths.root),
});

const htmlPlugin = (env) => new HtmlWebPackPlugin({
    template: './src/assets/index.html',
    filename: env === 'production' ? '../../resources/views/index.html' : 'index.html',
    publicPath: env === 'production' ? '/js' : 'auto',
});

const devServerPort = parseInt(process.env.PORT || 3000, 10) + 1;

module.exports = ({ env }) => ({
  mode: env,
  devtool: 'source-map',
  output: {
    path: env === 'production' ? paths.build : paths.buildDev,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.(s?css)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        // Compiles Sass to CSS
        'sass-loader',
      ],
    },
    // Fonts
    {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        outputPath: '../fonts/',
      },
    },
    // Images
    {
      test: /\.(ico|gif|png|jpe?g|webp|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: '../images/',
        },
      }],
    },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      src: paths.src,
      sass: paths.sass,
    },
  },
  /*
   * Settings `webpackDevServer`
   */
  devServer: {
    port: devServerPort,

    // Enable gzip compression of generated files
    compress: true,

    // Active HMR • only changes to CSS are currently hot reloaded.
    // JS changes will refresh the browser
    hot: true,

    // Fix the problem with React-Router (Cannot get /route when we refresh).
    historyApiFallback: true,

    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
  },
  plugins: [
    htmlPlugin(env),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
});