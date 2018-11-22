import { Injectable, Reflector } from '@one/core';

import { AbstractAction } from '../actions';
import { COMMAND_ACTION } from './';

export function Command(action: AbstractAction): ClassDecorator {
  return (target) => {
    Reflector.set(COMMAND_ACTION, action, target);
    Injectable()(target);
  };
}