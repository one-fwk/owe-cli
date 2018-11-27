import { Injectable } from '@one/core';
import { Command as Options } from 'commander';
import { Command } from './command.decorator';

import { Input } from '../models';
import { ServeAction } from '../actions';
import { AbstractCommand } from './abstract.command';

// @Command(ServeAction)
@Injectable()
export class ServeCommand extends AbstractCommand {
  constructor(public readonly action: ServeAction) {
    super();
  }

  public load() {
    this.program
      .command('serve [project] [browser]')
      .alias('s')
      .description('Compile extensions and start a dev server')
      .option('--hmr', 'Use Hot Module Replacement')
      .option('--port [port]', 'Port to use for dev server')
      .action(async (project: string, browser: string, command: Options) => {
        if (command.cwd) {
          this.workspace.setCwd(command.cwd);
        }

        await this.workspace.validate();

        const inputs: Input[] = [];
        inputs.push({ name: 'project', value: project });
        inputs.push({ name: 'browser', value: browser });

        const options: Input[] = [];
        options.push({ name: 'hmr', value: !!command.hmr });
        options.push({ name: 'port', value: Number(command.port) });

        await this.action.handle(inputs, options);
      });
  }
}