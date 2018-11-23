import { Injectable, Utils } from '@one/core';
import { snakeCase } from 'voca';
import { Compiler } from 'webpack';

import { BrowserManifest, BrowserTarget, ContentScriptContext, Context, Project } from '../../models';
import { WebpackPlugin } from './webpack-plugin';

export type CompilationAsset = {
  source(): string | Buffer;
  size(): number;
};

@Injectable()
export class ManifestPlugin extends WebpackPlugin {
  private readonly manifestKeys = [
    'defaultLocale',
    'contentSecurityPolicy',
    'versionName',
    'manifestVersion',
    'homepageUrl',
    'devtoolsPage',
  ];

  private readonly contentScriptKeys = [
    'allFrames',
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

    return obj;
  }

  private applyProjectContexts(): Project {
    const { contexts } = this.workspace.getProject();
    const { index, outputHtml } = contexts[Context.POPUP];

    const contentScripts = contexts[Context.CONTENT_SCRIPTS]
      .map(cs => this.snakerize(this.contentScriptKeys, cs))
      .map((cs: ContentScriptContext) => ({
        ...cs,
        js: [cs.outputFile],
      }));

    const popup = {
      browser_action: {
        default_popup: index || outputHtml,
      }
    };

    const background = {
      scripts: [contexts[Context.BACKGROUND].outputFile],
    };
  }

  private createManifest({ manifest }: Project) {
    const browserManifest: BrowserManifest = (manifest as any)[this.workspace.browser];

    (<any>Object).values(BrowserTarget).forEach((browser: string) => {
      delete (manifest as any)[browser];
    });

    manifest = this.snakerize(this.manifestKeys, {
      ...manifest,
      ...browserManifest,
    });

    return JSON.stringify(manifest);
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tap(this.constructor.name, (compilation) => {
      const project = this.applyProjectContexts();
      const manifest = this.createManifest(project);

      compilation.assets['manifest.json'] = {
        source: () => manifest,
        size: () => manifest.length,
      } as CompilationAsset;
    });
  }
}