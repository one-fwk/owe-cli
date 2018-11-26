import { Injectable } from '@one/core';
import { Compiler } from 'webpack';

import { WorkspaceService } from '../../workspace';
import { KeyService } from '../key.service';

export interface IWebpackPlugin {
  apply(compiler: Compiler): void;
}

@Injectable()
export abstract class WebpackPlugin {
  constructor(
    protected readonly workspace: WorkspaceService,
    protected readonly key: KeyService,
  ) {}

  public abstract apply(compiler: Compiler): void;
}