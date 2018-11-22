/*import { Injectable } from '@one/core';

@Injectable()
export abstract class AbstractAction {
  public abstract async handle(): Promise<void>;
}*/

export interface Action {
  handle(): Promise<void>;
}