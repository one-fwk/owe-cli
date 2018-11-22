import { Module } from '@one/core';

import { WorkspaceService } from './workspace.service';

@Module({
  exports: [WorkspaceService],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}