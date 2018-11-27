import { Injectable } from '@one/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Compiler } from 'webpack';
import { from } from 'rxjs';
import * as fs from 'fs-extra';

import { BaseContext } from '../../models';
import { ContextService } from '../context.service';
import { HashService } from '../hash.service';
import { WorkspaceService } from '../../workspace';
import { filterAsync } from '../../util';

@Injectable()
export class EntryModulePlugin {

  constructor(
    protected readonly workspace: WorkspaceService,
    protected readonly context: ContextService,
    protected readonly hash: HashService,
  ) {}

  public getEntryPoint(context: BaseContext)  {
    const entrySplit = context.entry.split('#');

    if (entrySplit.length > 1) {
      return {
        ...context,
        entry: entrySplit[0],
        entryModule: entrySplit[1],
      } as BaseContext;
    }

    return context;
  }

  public createMainTemplate(entry: string, entryModule: string) {
    return `
      import { OneFactory } from '@one/core';
  
      import { ${entryModule} } from './${entry}';
  
      (async () => {
        const app = new OneFactory(${entryModule});
        await app.start();
      });
    `;
  }

  public applyEntries() {
    const cs = this.context.getContentScripts();
    const background = this.context.getBackground();
    const popup = this.context.getPopup();

    const scripts = [...cs, background, popup];

    scripts.forEach((context: BaseContext) => {
      const { entry, entryModule } = this.getEntryPoint(context);
      const hash = this.hash.get(entry)!;
      const path = this.workspace.getProjectRoot(hash);

      if (!fs.pathExistsSync(path)) {
        fs.writeFileSync(path, this.createMainTemplate(entry, entryModule!));
      }
    });/*Promise.all(scripts.filter(c => c).map(context => {
      const { entry, entryModule } = this.getEntryPoint(context);
      const hash = this.hash.get(entry)!;

      const template = this.createMainTemplate(entry, entryModule!);

      compilation.assets[hash] = {
        source: () => template,
        size: () => template.length,
      } as CompilationAsset;
    }));*/
  }

  // @TODO: Needs fixing
  apply(compiler: Compiler) {
    // @TODO: Figure out a way to add a file before compiling
    /*compiler.hooks.compilation.tap('nothing', (compilation) => {
      //compilation.buildModule.tap('nothing', () => {
        const cs = this.context.getContentScripts();
        const background = this.context.getBackground();
        const popup = this.context.getPopup();

        const scripts = [...cs, background, popup];

        scripts.filter(c => c).forEach(context => {
          const { entry, entryModule } = this.getEntryPoint(context);
          const hash = this.hash.get(entry)!;

          const template = this.createMainTemplate(entry, entryModule!);

          compilation.assets[hash] = {
            source: () => template,
            size: () => template.length,
          } as CompilationAsset;
        });
      //});
    });

    compiler.hooks.emit.tap(this.constructor.name, (compilation) => {
      const cs = this.context.getContentScripts();
      const background = this.context.getBackground();
      const popup = this.context.getPopup();

      const scripts = [...cs, background, popup];

      scripts.filter(c => c).forEach(context => {
        const { entry, entryModule } = this.getEntryPoint(context);
        const hash = this.hash.get(entry)!;

        const template = this.createMainTemplate(entry, entryModule!);

        compilation.assets[hash] = {
          source: () => template,
          size: () => template.length,
        } as CompilationAsset;
      });
    });*/
  }
}