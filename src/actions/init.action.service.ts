import { Injectable } from '@one/core';
import { AbstractAction } from './abstract-action';

@Injectable()
export class InitAction extends AbstractAction {
  async handle() {}
}