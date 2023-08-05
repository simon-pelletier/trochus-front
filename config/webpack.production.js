/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

module.exports = (dotenv) => {
  const plugins = [
    new HtmlWebpackPlugin({
      favicon: `${paths.assets}/favicons/favicon-32x32-default.png`,
      template: `${paths.assets}/index.html`,
      filename: "../index.html",
      publicPath: "/js",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ];

  return {
    mode: "production",
    devtool: "source-map",
    plugins,
    module: {
      rules: [
        {
          test: /\.(ts|js|tsx|jsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        //images
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.(s?css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: "./" },
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 3,
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
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
      ],
    },
  };
};
