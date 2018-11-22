import { Module } from '@one/core';

import { ActionsModule } from '../actions';
import { ProgramModule } from '../program';

import { ServeCommand } from './serve.command.service';
import { COMMANDS } from './tokens';

@Module({
  imports: [
    ProgramModule,
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