
      import { OneFactory } from '@one/core';
  
      import { AppPopupModule } from './popup/app.popup.module';
  
      (async () => {
        const app = new OneFactory(AppPopupModule);
        await app.start();
      });
    