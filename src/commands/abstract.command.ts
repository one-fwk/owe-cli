import { Injectable } from '@one/core';
import * as program from 'commander';

import { WorkspaceService } from '../workspace';
import { AbstractAction } from '../actions';

@Injectable()
export abstract class AbstractCommand {
  constructor(
    protected readonly workspace: WorkspaceService,
  ) {}

  protected readonly program = program;

  public action!: AbstractAction;

  public abstract load(): void;
}