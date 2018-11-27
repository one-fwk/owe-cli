import { Injectable } from '@one/core';
import { Compiler } from 'webpack';

import { WorkspaceService } from '../../workspace';
import { ContextService } from '../context.service';
import { HashService } from '../hash.service';

export interface IWebpackPlugin {
  apply(compiler: Compiler): void;
}

@Injectable()
export abstract class WebpackPlugin {
  constructor(
    protected readonly workspace: WorkspaceService,
    protected readonly context: ContextService,
    protected readonly hash: HashService,
  ) {}

  public abstract apply(compiler: Compiler): void;
}