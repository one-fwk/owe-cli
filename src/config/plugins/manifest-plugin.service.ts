import { Injectable } from '@one/core';
import { Compiler } from 'webpack';

import { ContextService } from '../context.service';
import { HashService } from '../hash.service';
import { WorkspaceService } from '../../workspace';
import { BrowserTarget, ContentScript, Manifest, } from '../../models';
import { snakerize } from '../../util';

export type CompilationAsset = {
  source(): string | Buffer;
  size(): number;
};

@Injectable()
export class ManifestPlugin {
  private readonly manifestKeys = [
    'defaultLocale',
    'versionName',
    'homepageUrl',
    'devtoolsPage',
    {
      chrome: [
        'contentSecurityPolicy',
        'manifestVersion'
      ],
    },
  ];

  constructor(
    protected readonly workspace: WorkspaceService,
    protected readonly context: ContextService,
    protected readonly hash: HashService,
  ) {}

  /**
   * Apply contexts from our custom manifest to the used manifest
   * @param manifest
   */
  private applyManifestContexts(manifest: Manifest) {
    const contentScripts = this.context.getContentScripts();
    const background = this.context.getBackground();
    const popup = this.context.getPopup();

    if (contentScripts) {
      manifest.content_scripts = contentScripts
        .map((csc): ContentScript => ({
          all_frames: csc.allFrames,
          matches: csc.matches,
          js: [csc.outputFile! + '.js'],
        }));
    }

    if (background) {
      manifest.background = {
        scripts: [background.outputFile! + '.js'],
      };
    }

    if (popup) {
      manifest.browser_action = {
        default_popup: popup.outputHtml!,
      };
    }

    return manifest;
  }

  private createManifest(): Manifest {
    // don't manipulate the original object
    const { manifest } = this.workspace.project;

    return snakerize(this.manifestKeys, manifest);

    /*(<any>Object).values(BrowserTarget).forEach((browser: string) => {
      (<any>manifest)[browser] = undefined;
    });

    return newManifest;*/
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tap(this.constructor.name, (compilation) => {
      const manifest = this.createManifest();
      this.applyManifestContexts(manifest);
      const manifestSource = JSON.stringify(manifest);

      console.log(manifestSource);
      compilation.assets['manifest.json'] = {
        source: () => manifestSource,
        size: () => manifestSource.length,
      } as CompilationAsset;
    });
  }
}