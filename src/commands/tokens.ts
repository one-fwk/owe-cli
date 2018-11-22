import { InjectionToken } from '@one/core';

import { AbstractCommand } from './abstract.command';

export const COMMAND_ACTION = Symbol.for('cli-command-action');
export const COMMANDS = new InjectionToken<AbstractCommand[]>('cli-commands');