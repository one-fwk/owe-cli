import { Injectable, Reflector } from '@one/core';

import { Action } from '../actions';
import { COMMAND_ACTION } from './';

export function Command(action: Action): ClassDecorator {
  return (target) => {
    Reflector.set(COMMAND_ACTION, action, target);
    Injectable()(target);
  };
}