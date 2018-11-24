import { Injectable } from '@one/core';
import * as webpack from 'webpack';
import { Compiler } from 'webpack';

import { BaseContext } from '../../models';
import { WebpackPlugin } from './webpack-plugin';

@Injectable()
export class EntryModulePlugin extends WebpackPlugin {
  private getProjectContext(context: BaseContext)  {
    const mainSplit = context.main.split('#');

    if (mainSplit.length > 1) {
      return {
        ...context,
        main: mainSplit[0],
        entryModule: mainSplit[1],
      } as BaseContext;
    }

    return context;
  }

  private generateHmrTemplate() {
    return ''/*this.hmr ? `
          module.hot.accept();
          module.hot.dispose(() => app.destroy());
        ` : ''*/
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
  
        ${this.generateHmrTemplate()}
      });
    `;
  }

  public createEntryPoints() {
    return {

    };
  }

  private applyUuids() {

  }

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tap(this.constructor.name, (compilation) => {

    });
  }
}