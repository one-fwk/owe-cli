const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const currentProject = 'appwriter';
const currentCommand = 'serve';
const isDev = true;

const schemaDef = require('./owe.json');
const project = schemaDef.projects[currentProject];
const resolvePlugins = [];

const root = (...paths) => path.join(process.cwd(), ...paths);

function createContentEntries() {}

function createBackgroundEntry() {}

function createPopupEntry() {}

if (isDev) {
  resolvePlugins.push(
    new TsConfigPathsPlugin({
      configFile: root(project.tsConfig),
    }),
  );
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: 'inline-cheap-source-map',
  context: root(project.sourceRoot),
  // Only used for testing purposes in a node environment
  externals: ['sinon-chrome'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: resolvePlugins,
  }
};