import { Inject, Injectable } from '@one/core';

import { WebpackConfigService } from '../config';
import { WorkspaceService } from '../workspace';
import { Input } from '../models';

@Injectable()
export abstract class AbstractAction {
  @Inject(WebpackConfigService)
  protected readonly webpackConfig!: WebpackConfigService;

  @Inject(WorkspaceService)
  protected readonly workspace!: WorkspaceService;

  public abstract handle(
    inputs?: Input[],
    options?: Input[],
  ): Promise<void>;
}