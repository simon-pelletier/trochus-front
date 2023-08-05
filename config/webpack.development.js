/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

module.exports = (dotenv) => ({
  mode: "development",
  devServer: {
    open: false,
    // Fix the problem with React-Router (Cannot get /route when we refresh).
    historyApiFallback: true,
    port: parseInt(dotenv.parsed.PORT || 3001, 10),
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      favicon: `${paths.assets}/favicons/favicon-32x32-default.png`,
      template: `${paths.assets}/index.html`,
      filename: "./index.html",
      publicPath: "auto",
    }),
    new webpack.DefinePlugin({
      // variable d'environnement //TODO => .env séparé
      "process.env.name": JSON.stringify("Trochus"),
    }),
    // Recharge uniquement ce qu'il y a besoin
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["react-refresh/babel"],
            },
          },
        ],
      },
      //images
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // Styles
      {
        test: /\.(s?css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
              url: {
                filter: (url) => {
                  if (url.includes("charset=utf-8;;")) {
                    return false;
                  }
                  return true;
                },
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
});
