
      import { OneFactory } from '@one/core';
  
      import { AppBackgroundModule } from './background/app.background.module';
  
      (async () => {
        const app = new OneFactory(AppBackgroundModule);
        await app.start();
      });
    