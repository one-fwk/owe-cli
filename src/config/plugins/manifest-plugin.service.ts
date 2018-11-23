import { Injectable, Utils } from '@one/core';
import { snakeCase } from 'voca';
import { Compiler } from 'webpack';

import { BrowserManifest, BrowserTarget } from '../../models';
import { WebpackPlugin } from './webpack-plugin';

export type CompilationAsset = {
  source(): string | Buffer;
  size(): number;
};

@Injectable()
export class ManifestPlugin extends WebpackPlugin {
  private readonly snakerizeKeys = [
    'defaultLocale',
    'contentSecurityPolicy',
    'versionName',
  ];

  private renameProperty(obj: any, oldKey: string, newKey: string) {
    const value = obj[oldKey];

    delete obj[oldKey];
    obj[newKey] = value;

    return obj;
  }

  private snakerize(keys: any[], obj: any) {
    const traverse = (parent: any, next: any) => {
      if (Utils.isString(next) && !Utils.isNil(next)) {
        const newKey = snakeCase(next);
        this.renameProperty(parent, next, newKey);

      } else if (Array.isArray(next)) {
        next.forEach(n => traverse(parent, n));

      } else if (Utils.isObject(next)) {
        Object.keys(next).forEach(prop => {
          traverse(parent[prop], next[prop]);
        });
      }
    };

    keys.forEach(key => {
      traverse(obj, key);
    });
  }

  private createManifest() {
    const browserManifest: BrowserManifest = (this.workspace.project.manifest as any)[this.workspace.browser];

    (<any>Object).values(BrowserTarget).forEach((browser: string) => {
      delete (this.workspace.project.manifest as any)[browser];
    });

    return JSON.stringify(
      this.snakerize(this.snakerizeKeys, {
        ...this.workspace.project.manifest,
        ...browserManifest,
      }),
    );
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tap(this.constructor.name, (compilation) => {
      const manifest = this.createManifest();

      compilation.assets['manifest.json'] = {
        source: () => manifest,
        size: () => manifest.length,
      } as CompilationAsset;
    });
  }
}