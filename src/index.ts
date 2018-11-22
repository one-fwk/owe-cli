import { OneFactory } from '@one/core';
import * as commander from 'commander';

import * as pkg from '../package.json';
import { CliModule } from './cli.module';

(async () => {
  const cli = new OneFactory(CliModule);
  commander.version(pkg.version);
  await cli.start();
})();