#!/usr/bin/env node
import { OneFactory } from '@one/core';
import * as commander from 'commander';

import { CliModule } from '../src';

(async () => {

  const cli = new OneFactory(CliModule);
  await cli.start();

  commander.parse(process.argv);
})();