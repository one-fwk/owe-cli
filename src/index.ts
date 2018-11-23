import { OneFactory } from '@one/core';
import * as commander from 'commander';
import * as webpack from 'webpack';

import * as pkg from '../package.json';
import { CliModule } from './cli.module';

(async () => {
  const cli = new OneFactory(CliModule);
  commander.version(pkg.version);
  await cli.start();
})();

let compiler = webpack({});

compiler.hooks.beforeRun.tap('lol', (compilation) => {

  // Insert this list into the webpack build as a new file asset:
  compilation.assets[]
});