import { Inject, Injector, Module, OnModuleInit, Reflector } from '@one/core';
import * as program from 'commander';

import { CommandsModule, COMMANDS, AbstractCommand, COMMAND_ACTION } from './commands';
import { WorkspaceModule, WorkspaceService } from './workspace';
import { AbstractAction } from './actions';
import * as pkg from '../package.json';

@Module({
  imports: [
    WorkspaceModule,
    CommandsModule,
  ],
})
export class CliModule implements OnModuleInit {
  @Inject(COMMANDS)
  private readonly commands: AbstractCommand[];

  constructor(
    private readonly workspace: WorkspaceService,
    private readonly injector: Injector,
  ) {}

  async onModuleInit() {
    await this.workspace.validate();
    program.version(pkg.version);

    // @TODO: Move this into CommandsModule
    this.commands.forEach(commandRef => {
      const actionRef = Reflector.get(COMMAND_ACTION, commandRef);
      const action = this.injector.get<AbstractAction>(actionRef);
      const command = this.injector.resolve<AbstractCommand>(<any>commandRef);

      command.action = action;
      command.load();
    });

    program.parse(process.argv);
  }
}