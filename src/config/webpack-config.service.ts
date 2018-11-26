import { Injectable } from '@one/core';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { WebpackPluginServe } from 'webpack-plugin-serve';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import { WorkspaceService } from '../workspace';
import {
  EntryModulePlugin,
  ManifestPlugin,
  WebpackPlugin,
  IWebpackPlugin,
} from './plugins';

@Injectable()
export class WebpackConfigService {
  private readonly plugins: (WebpackPlugin | any)[] = [];
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

  private createDevelopmentConfig() {
    this.config.devtool = 'inline-cheap-source-map';
    // this.config.externals.push('sinon-chrome');

    const tsConfigFile = this.workspace.dir(this.workspace.project.tsConfig);
    this.config.resolve.plugins.push(
      new TsConfigPathsPlugin({
        configFile: tsConfigFile,
      }),
    );

    // Dunno how well this is gonna work
    this.config.watch = true;
    this.plugins.push(
      new WebpackPluginServe({
        compress: true,
        // liveReload: true,
      }),
    );
  }

  private createProductionConfig() {
    this.config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            toplevel: true,
            mangle: true,
            ie8: false,
            keep_fnames: false,
            safari10: false,
          },
        }),
      ],
    };
  }

  public async create(isDev: boolean, useHmr?: boolean) {
    this.config.mode = isDev ? 'development' : 'production';
    this.config.context = this.workspace.getSourceRoot();

    const config = isDev
      ? this.createDevelopmentConfig()
      : this.createProductionConfig();

    this.plugins.push(this.manifestPlugin);
  }
}