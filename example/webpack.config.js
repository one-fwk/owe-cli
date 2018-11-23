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

function createContentEntries() {}

function createBackgroundEntry() {}

function createPopupEntry() {}

function getContextConfig(context = {}) {
  const splt = context.main.split('#');

  if (splt.length > 1) {
    return {
      ...context,
      main: splt[0],
      entryModule: splt[1],
    };
  }

  return context;
}

function toArray(arr) {
  return typeof arr !== 'array' ? [arr] : arr;
}

class EntryModulePlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync(EntryModulePlugin.name, (compilation, done) => {
      Object.keys(project.contexts).forEach(contextName => {
        toArray(project.contexts[contextName]).forEach(context => {
          const { main, entryModule, outputFile } = getContextConfig(context);

          // should generate a random main id that should be put into the entries module
          compilation.assets[outputFile]
        });
      });

      done();
    });
  }
}

class ManifestPlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tapAsync(ManifestPlugin.name, (compilation) => {
      // create manifest file
      compilation.assets[]
    });
  }
}

const plugins = [
  new webpack.ProgressPlugin(),
  new ManifestPlugin(),
];

if (project.contexts.popup.entryModule || project.contexts.popup.main.includes('#')) {
  plugins.push(new EntryModulePlugin());
}

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
  },
  plugins,
};