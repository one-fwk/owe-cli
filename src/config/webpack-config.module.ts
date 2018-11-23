import { Module } from '@one/core';

import { WorkspaceModule } from '../workspace';
import { PluginsModule } from './plugins';

@Module({
  imports: [
    WorkspaceModule,
    PluginsModule,
  ],
})
export class WebpackConfigModule {}