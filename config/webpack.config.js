/* eslint-disable import/order */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { merge } = require('webpack-merge');
const path = require('path');
const paths = require('./paths');
const dotenv = require('dotenv-flow').config({
  path: path.join(paths.root),
});
const commonConfig = require('./webpack.common');

module.exports = (envVars = { env: 'production' }) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig(env, dotenv), envConfig(dotenv));
  return config;
};