import { Injector, Module, OnModuleInit } from '@one/core';
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

  onModuleInit() {
    program
      .version(pkg.version)
      .option('--cwd [dir]', 'Directory to use as CWD')
      .action(({ cwd }: program.Command) => {
        if (cwd) {
          this.workspace.setCwd(cwd);
        }
      });

    program.parse(process.argv);
  }
}