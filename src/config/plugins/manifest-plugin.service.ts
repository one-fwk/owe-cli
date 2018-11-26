import { Injectable } from '@one/core';
import { Compiler } from 'webpack';

import { WebpackPlugin } from './webpack-plugin';
import { snakerize } from '../../util';
import {
  BackgroundContext,
  BrowserManifest,
  BrowserTarget, ContentScript,
  ContentScriptContext,
  Context,
  CustomManifest,
  Manifest, PopupContext,
  Project,
} from '../../models';

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

  /**
   * Apply contexts from our custom manifest to the used manifest
   * @param manifest
   */
  private applyManifestContexts(manifest: Manifest) {
    const { contexts } = this.workspace.project;

    if (contexts[Context.CONTENT_SCRIPTS]) {
      manifest.content_scripts = (<ContentScriptContext[]>contexts[Context.CONTENT_SCRIPTS])
        .map((csc): ContentScript => ({
          all_frames: csc.allFrames,
          matches: csc.matches,
          js: [csc.outputFile],
        }));
    }

    if (contexts[Context.POPUP]) {
      const { index, outputHtml } = <PopupContext>contexts[Context.POPUP];

      manifest.browser_action = {
        default_popup: (index || outputHtml)!,
      };
    }

    if (contexts[Context.BACKGROUND]) {
      const { outputFile } = <BackgroundContext>contexts[Context.BACKGROUND];

      manifest.background = {
        scripts: [outputFile],
      };
    }

    return manifest;
  }

  private createManifest(): Manifest {
    // don't manipulate the original object
    const { manifest } = this.workspace.getProject();

    for (const browser in BrowserTarget) {
      delete (<any>manifest)[browser];
    }

    return snakerize(this.manifestKeys, manifest);
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tap(this.constructor.name, (compilation) => {
      const manifest = this.createManifest();
      this.applyManifestContexts(manifest);
      const manifestSource = JSON.stringify(manifest);

      compilation.assets['manifest.json'] = {
        source: () => manifestSource,
        size: () => manifestSource.length,
      } as CompilationAsset;
    });
  }
}