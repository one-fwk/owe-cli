import { Injectable } from '@one/core';
import * as TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import { WorkspaceService } from '../workspace';
import { Project } from '../models';
import {
  EntryModulePlugin,
  ManifestPlugin,
  WebpackPlugin,
  IWebpackPlugin,
} from './plugins';

@Injectable()
export class WebpackConfigService {
  private readonly plugins: (WebpackPlugin | IWebpackPlugin)[] = [];
  private readonly config: any = {
    externals: [],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [],
    },
  };

  constructor(
    private readonly entryModulePlugin: EntryModulePlugin,
    private readonly manifestPlugin: ManifestPlugin,
    private readonly workspace: WorkspaceService,
  ) {}

  public async create(isDev: boolean, useHmr?: boolean) {
    this.config.mode = isDev ? 'development' : 'production';
    this.config.context = this.workspace.getSourceRoot();

    if (isDev) {
      this.config.devtool = 'inline-cheap-source-map';
      this.config.externals.push('sinon-chrome');
      const tsConfigFile = this.workspace.dir(this.workspace.project.tsConfig);

      this.config.resolve.plugins.push(
        new TsConfigPathsPlugin({
          configFile: tsConfigFile,
        }),
      );
    }

    this.plugins.push(this.manifestPlugin);
  }
}