import { Module } from '@one/core';

import { EntryModulePlugin, ManifestPlugin } from './plugins';
import { WorkspaceModule } from '../workspace';
import { HashService } from './hash.service';
import { ContextService } from './context.service';
import { WebpackConfigService } from './webpack-config.service';

@Module({
  providers: [
    HashService,
    ContextService,
    EntryModulePlugin,
    ManifestPlugin,
    WebpackConfigService,
  ],
  exports: [
    WebpackConfigService,
  ],
  imports: [
    WorkspaceModule,
  ],
})
export class WebpackConfigModule {}