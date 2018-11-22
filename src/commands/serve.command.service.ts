import { Command } from './command.decorator';

import { ServeAction } from '../actions';
import { AbstractCommand } from './abstract.command';

@Command(ServeAction)
export class ServeCommand extends AbstractCommand {
  public load() {}
}