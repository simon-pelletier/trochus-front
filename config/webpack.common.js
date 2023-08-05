/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { DefinePlugin } = require('webpack');
const paths = require('./paths');

module.exports = (env, dotenv) => ({
  entry: [
    // SCSS
    `${paths.sass}/index.scss`,
    // JS
    `${paths.src}/index.js`,
  ],
  resolve: {
    plugins: [],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      app: paths.src,
      src: paths.src,
      styles: path.resolve(paths.src, 'styles'),
      '@assets': path.resolve(paths.assets),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      /*{
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        generator: {
          filename: 'public/[hash][ext][query]',
        },
      },*/
    ],
  },
  output: {
    path: paths.build,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
});