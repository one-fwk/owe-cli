import { InjectionToken, Module } from '@one/core';
import * as commander from 'commander';

export const PROGRAM = new InjectionToken<commander.CommanderStatic>('Commander<Program>');

@Module({
  exports: [PROGRAM],
  providers: [
    {
      provide: PROGRAM,
      useValue: commander,
    }
  ],
})
export class ProgramModule {}