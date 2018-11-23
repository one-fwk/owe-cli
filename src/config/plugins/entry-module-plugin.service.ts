import { Injectable } from '@one/core';
import { BaseContext } from '../../models';

import { WebpackPlugin } from './webpack-plugin';

@Injectable()
export class EntryModulePlugin extends WebpackPlugin {
  private getProjectContext(context: BaseContext)  {
    const splt = context.main.split('#');

    if (splt.length > 1) {
      return {
        ...context,
        main: splt[0],
        entryModule: splt[1],
      } as BaseContext;
    }

    return context;
  }

  private createMainTemplate(context: BaseContext) {
    const { main, entryModule } = this.getProjectContext(context);

    return `
      import { OneFactory } from '@one/core';
  
      // Should . be an absolute path??
      import { ${entryModule} } from './${main}';
  
      (async () => {
        const app = new OneFactory(${entryModule});
        await app.start();
  
        ${''/*hmr ? `
          module.hot.accept();
          module.hot.dispose(() => app.destroy());
        ` : ''*/}
      });
    `;
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tap(this.constructor.name, (compilation) => {

    });
  }
}