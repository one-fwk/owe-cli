import { Injectable } from '@one/core';
import { CheckerPlugin } from 'awesome-typescript-loader';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { WebpackPluginServe } from 'webpack-plugin-serve';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';

import { WebpackOptions } from './webpack-options.interface';
import { WorkspaceService } from '../workspace';
import { ContextService } from './context.service';
import { HashService } from './hash.service';
import {
  EntryModulePlugin,
  ManifestPlugin,
  WebpackPlugin,
  IWebpackPlugin,
} from './plugins';

@Injectable()
export class WebpackConfigService {
  // private readonly plugins: (WebpackPlugin | any)[] = [];
  public readonly config: any = {
    entry: {},
    externals: [],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [],
    },
    module: {
      rules: [],
    },
    plugins: [
      // this.entryModulePlugin,
      new CheckerPlugin(),
      this.manifestPlugin,
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        global: 'window',
      }),
    ],
  };

  constructor(
    private readonly entryModulePlugin: EntryModulePlugin,
    private readonly manifestPlugin: ManifestPlugin,
    private readonly workspace: WorkspaceService,
    private readonly context: ContextService,
    private readonly hash: HashService,
  ) {}

  private createDevelopmentConfig(options: WebpackOptions) {
    this.config.devtool = 'cheap-inline-source-map';

    const tsConfigFile = this.workspace.getTsConfigFile();
    this.config.resolve.plugins.push(
      new TsConfigPathsPlugin({
        configFile: tsConfigFile,
      }),
    );

    // Dunno how well this is gonna work
    this.config.watch = true;
    this.config.plugins.push(
      new WebpackPluginServe({
        compress: true,
        ...options,
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

  private addEntry(entry: string, output: string) {
    const hashEntry = this.workspace.getProjectRoot(
      this.hash.generate(entry),
    );

    this.config.entry[output] = this.config.mode !== 'production'
      ? [hashEntry, 'webpack-plugin-serve/client']
      : hashEntry;
  }

  private createBackgroundEntry() {
    const background = this.context.getBackground();

    if (background) {
      const { entry, outputFile } = this.entryModulePlugin.getEntryPoint(background);
      this.addEntry(entry, outputFile);
    }
  }

  private createContentScriptEntries() {
    const contentScripts = this.context.getContentScripts();

    if (contentScripts) {
      contentScripts.forEach(cs => {
        const { entry, outputFile } = this.entryModulePlugin.getEntryPoint(cs);
        this.addEntry(entry, outputFile);
      });
    }
  }

  // @TODO: Needs fixing
  private createPopupEntry() {
    const popup = this.context.getPopup();

    if (popup) {
      const { entry, outputFile, outputHtml } = this.entryModulePlugin.getEntryPoint(popup);
      this.addEntry(entry, outputFile);

      this.config.plugins.push(
        new HtmlWebpackPlugin({
          filename: outputHtml,
          chunks: [''],
          // template,
        }),
      );
    }
  }

  private addAtlRule() {
    this.config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader',
      options: {
        configFileName: this.workspace.getTsConfigFile(),
      },
    });
  }

  public async create(isDev: boolean, options: WebpackOptions = {}) {
    this.config.mode = isDev ? 'development' : 'production';
    this.config.context = this.workspace.getProjectRoot();

    if (isDev) {
      this.createDevelopmentConfig(options);
    } else {
      this.createProductionConfig();
    }

    this.createContentScriptEntries();
    this.createBackgroundEntry();
    this.createPopupEntry();
    this.addAtlRule();

    this.config.output = {
      filename: '[name].js',
      path: this.workspace.dir(this.workspace.project.outputPath),
    };

    await this.entryModulePlugin.applyEntries();

    const compiler = webpack(this.config);

    if (isDev) {
      compiler.watch({
        ignored: [/node_modules/],
      }, () => {});
    } else {
      compiler.run(() => {});
    }
  }
}