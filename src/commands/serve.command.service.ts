import { Command as Options } from 'commander';
import { Command } from './command.decorator';

import { Input } from '../models';
import { ServeAction } from '../actions';
import { AbstractCommand } from './abstract.command';

@Command(ServeAction)
export class ServeCommand extends AbstractCommand {
  public load() {
    this.program
      .command('serve [project] [browser]')
      .alias('s')
      .description('Compile extensions and start a dev server')
      .option('--hmr', 'Use Hot Module Replacement')
      .action(async (project: string, browser: string, command: Options) => {
        const inputs: Input[] = [];
        inputs.push({ name: 'project', value: project });
        inputs.push({ name: 'browser', value: browser });

        const options: Input[] = [];
        options.push({ name: 'hmr', value: !!command.hmr });

        await this.action.handle(inputs, options);
      });
  }
}