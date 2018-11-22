import { Injectable } from '@one/core';

import { Action } from './action.interface';

@Injectable()
export class ServeAction implements Action {
  async handle() {}
}