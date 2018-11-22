import { Injectable } from '@one/core';
import * as program from 'commander';

import { Action } from '../actions';

@Injectable()
export abstract class AbstractCommand {
  protected readonly program = program;

  public action!: Action;

  public abstract load(): void;
}