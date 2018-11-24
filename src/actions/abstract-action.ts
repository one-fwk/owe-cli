import { Injectable } from '@one/core';

import { WebpackConfigService } from '../config';
import { WorkspaceService } from '../workspace';
import { Input } from '../models';

@Injectable()
export abstract class AbstractAction {
  constructor(
    protected readonly webpackConfig: WebpackConfigService,
    protected readonly workspace: WorkspaceService,
  ) {}

  public abstract handle(
    inputs?: Input[],
    options?: Input[],
  ): Promise<void>;
}