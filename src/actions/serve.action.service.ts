import { Injectable } from '@one/core';

import { AbstractAction } from './abstract-action';
import { Input } from '../models';

@Injectable()
export class ServeAction extends AbstractAction {
  private getProject(inputs: Input[]) {
    const { value } = inputs.find(input => input.name === 'project')!;

    if (!value) {
      throw new Error(`You haven't provided a project, nor have you set a default.`);
    }

    return value;
  }

  private getBrowser(inputs: Input[]) {
    const { value } = inputs.find(input => input.name === 'browser')!;

    if (!value) {
      throw new Error(`You must specify a browser`);
    }

    return value;
  }

  private getHmrOption(options: Input[]) {
    return (options.find(option => option.name === 'hmr') || {} as any).value;
  }

  public async handle(inputs: Input[], options: Input[]) {
    const project = this.getProject(inputs);
    const browser = this.getBrowser(inputs);
    const useHmr = this.getHmrOption(options);

    this.workspace.useProject(project);
    this.workspace.targetBrowser(browser);

    const config = await this.webpackConfig.create(true, useHmr);
  }
}