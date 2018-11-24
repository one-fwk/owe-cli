import { Module } from '@one/core';

import { WorkspaceModule } from '../workspace';
import { WebpackConfigModule } from '../config';
import { ServeAction } from './serve.action.service';

@Module({
  imports: [
    WorkspaceModule,
    WebpackConfigModule,
  ],
  exports: [
    ServeAction,
  ],
  providers: [
    ServeAction,
  ],
})
export class ActionsModule {}