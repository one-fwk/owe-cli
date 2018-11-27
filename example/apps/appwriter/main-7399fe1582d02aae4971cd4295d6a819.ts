
      import { OneFactory } from '@one/core';
  
      import { AppContentModule } from './content/app.content.module';
  
      (async () => {
        const app = new OneFactory(AppContentModule);
        await app.start();
      });
    