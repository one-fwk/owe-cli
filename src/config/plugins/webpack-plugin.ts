import { Injectable } from '@one/core';
import { Compiler } from 'webpack';
import { WorkspaceService } from '../../workspace';

export interface IWebpackPlugin {
  apply(compiler: Compiler): void;
}

@Injectable()
export abstract class WebpackPlugin {
  constructor(
    protected readonly workspace: WorkspaceService,
  ) {}

  public abstract apply(compiler: Compiler): void;
}