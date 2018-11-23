import { Injectable } from '@one/core';
import * as TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import * as uuidv1 from 'uuid/v1';

import { WorkspaceService } from '../workspace';
import { Project } from '../models';
import { toArray } from '../util';
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

  private generateUniqueIds() {
    const { contexts } = this.workspace.project;

    (<any>Object).keys(contexts).forEach(name => {
      contexts[name] = toArray(contexts[name]).map(context => {
        const uuid = uuidv1();

        return {
          ...context,
          uuid,
        };
      });
    });
  }

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