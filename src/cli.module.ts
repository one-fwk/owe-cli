import { Inject, Injector, Module, OnModuleInit } from '@one/core';

import { AbstractAction } from './actions';
import { CommandsModule, COMMANDS, AbstractCommand } from './commands';

@Module({
  imports: [
    CommandsModule
  ],
})
export class CliModule implements OnModuleInit {
  @Inject(COMMANDS)
  private readonly commands: AbstractCommand[];

  constructor(private readonly injector: Injector) {}

  onModuleInit() {
    this.commands.forEach(command => {
      const action = this.injector.get<AbstractAction>(command);
      const instance = this.injector.resolve<AbstractCommand>(<any>command);

      instance.action = action;

      instance.load();
    });
  }
}