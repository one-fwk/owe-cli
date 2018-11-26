#!/usr/bin/env node
import { OneFactory } from '@one/core';

import { CliModule } from '../src';

(async () => {
  const cli = new OneFactory(CliModule);
  await cli.start();
})();