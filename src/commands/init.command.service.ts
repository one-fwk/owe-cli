import { AbstractCommand } from './abstract.command';
import { Command } from './command.decorator';
import * as inquirer from 'inquirer';

import { InitAction } from '../actions';

@Command(InitAction)
export class InitCommand extends AbstractCommand {
  load() {
    this.program
      .command('init')
      .action(async () => {
        const prompt = inquirer.createPromptModule();

        await this.action.handle();
      });
  }
}