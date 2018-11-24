import { Module, OnModuleInit } from '@one/core';
import * as program from 'commander';

import { CommandsModule } from './commands';
import { WorkspaceModule, WorkspaceService } from './workspace';
import * as pkg from '../package.json';

@Module({
  imports: [
    WorkspaceModule,
    CommandsModule,
  ],
})
export class CliModule implements OnModuleInit {
  constructor(private readonly workspace: WorkspaceService) {}

  async onModuleInit() {
    await this.workspace.validate();

    program.version(pkg.version);
    program.parse(process.argv);
  }
}