import { Module } from '@one/core';

import { ActionsModule } from '../actions';

import { ServeCommand } from './serve.command.service';
import { COMMANDS } from './tokens';

@Module({
  imports: [
    ActionsModule,
  ],
  exports: [COMMANDS],
  providers: [
    {
      provide: COMMANDS,
      useValue: [
        ServeCommand,
      ],
    },
  ],
})
export class CommandsModule {}