import { Inject, Injectable } from '@one/core';
import { CommanderStatic } from 'commander';

import { AbstractAction } from '../actions';
import { PROGRAM } from '../program';

@Injectable()
export abstract class AbstractCommand<A> {
  @Inject(PROGRAM)
  protected readonly program: CommanderStatic;

  public action: AbstractAction;

  public abstract load(): void;
}