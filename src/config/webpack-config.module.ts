import { Module } from '@one/core';

import { WorkspaceModule } from '../workspace';
import { PluginsModule } from './plugins';
import { UniqueKeyService } from './key.service';

@Module({
  providers: [UniqueKeyService],
  imports: [
    WorkspaceModule,
    PluginsModule,
  ],
})
export class WebpackConfigModule {}