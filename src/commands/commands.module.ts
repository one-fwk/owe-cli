import { Injector, Module, OnModuleInit, Reflector } from '@one/core';

import { AbstractAction, ActionsModule } from '../actions';
import { WorkspaceModule } from '../workspace';

import { ServeCommand } from './serve.command.service';
import { AbstractCommand } from './abstract.command';
import { COMMAND_ACTION } from './tokens';

const commands = [
  ServeCommand,
];

@Module({
  providers: commands,
  imports: [
    WorkspaceModule,
    ActionsModule,
  ],
})
export class CommandsModule implements OnModuleInit {
  constructor(private readonly injector: Injector) {}

  onModuleInit() {
    commands.forEach(commandRef => {
      const actionRef = Reflector.get(COMMAND_ACTION, commandRef);
      const action = this.injector.get<AbstractAction>(actionRef);
      const command = this.injector.resolve<AbstractCommand>(<any>commandRef);

      command.action = action;
      command.load();
    });
  }
}