import { Injectable } from '@one/core';

import { Action } from './action.interface';

@Injectable()
export class ServeAction implements Action {
  public handle(): Promise<void> {
    return undefined;
  }
}