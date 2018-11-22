import { Inject, Injector, Module, OnModuleInit, Reflector } from '@one/core';
import * as program from 'commander';

import { CommandsModule, COMMANDS, AbstractCommand, COMMAND_ACTION } from './commands';
import { Action } from './actions';
import { WorkspaceModule, WorkspaceService } from './workspace';

@Module({
  imports: [
    WorkspaceModule,
    CommandsModule,
  ],
})
export class CliModule implements OnModuleInit {
  @Inject(COMMANDS)
  private readonly commands!: AbstractCommand[];

  constructor(
    private readonly workspace: WorkspaceService,
    private readonly injector: Injector,
  ) {}

  async onModuleInit() {
    await this.workspace.validateSchema();

    this.commands.forEach(command => {
      const actionRef = Reflector.get(COMMAND_ACTION, command);
      const action = this.injector.get<Action>(actionRef);
      const instance = this.injector.resolve<AbstractCommand>(<any>command);

      instance.action = action;

      instance.load();
    });

    program.parse(process.argv);
  }
}