import { Module, OnModuleInit } from '@one/core';
import * as program from 'commander';

import { CommandsModule } from './commands';
import { WorkspaceModule } from './workspace';
import * as pkg from '../package.json';

@Module({
  imports: [
    WorkspaceModule,
    CommandsModule,
  ],
})
export class CliModule implements OnModuleInit {
  onModuleInit() {
    program.version(pkg.version);
    program.parse(process.argv);
  }
}