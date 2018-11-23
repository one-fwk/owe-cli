import { OneFactory } from '@one/core';
import { CliModule } from './cli.module';

(async () => {
  const cli = new OneFactory(CliModule);
  await cli.start();
})();