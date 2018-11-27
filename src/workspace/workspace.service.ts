import { Injectable } from '@one/core';
import * as fs from 'fs-extra';
import * as Ajv from 'ajv';
import * as path from 'path';
import * as YAML from 'yaml';

import { workspaceSchema } from './schemas';
import { find } from '../util';
import {
  BrowserTarget,
  Project,
  Workspace,
} from '../models';

@Injectable()
export class WorkspaceService {
  public schema!: Workspace;
  public project!: Project;
  public browser!: BrowserTarget;
  private cwd = process.cwd();

  private readonly ajv = new Ajv({
    useDefaults: true,
    allErrors: true,
    jsonPointers: true,
  });

  public getProjectRoot(...paths: string[]) {
    return this.dir(this.project.sourceRoot, ...paths);
  }

  /**
   * Returns a copy of project
   */
  public getProject(): Project {
    return { ...this.project } as Project;
  }

  public getTsConfigFile() {
    return this.dir(this.project.tsConfig);
  }

  /**
   * Returns an absolute path relative to CWD
   */
  public dir(...paths: string[]) {
    return path.join(this.cwd, ...paths);
  }

  public setCwd(cwd: string) {
    this.cwd = cwd;
  }

  public useProject(project: string) {
    if (!this.schema.projects[project]) {
      throw new Error(`Provided project ${project} is invalid and doesn't exist in your schematic.`);
    }

    // Never directly manipulate the project object
    // this.project = Object.freeze(this.schema.projects[project]);
    this.project = this.schema.projects[project];
  }

  public targetBrowser(browser: BrowserTarget) {
    if (!(<any>Object).values(BrowserTarget).includes(browser)) {
      throw new Error('Invalid browser specified');
    }

    if (!this.project.browserTargets.includes(browser)) {
      throw new Error('Invalid browser specified');
    }

    this.browser = browser;
  }

  private async parseSchema(workspacePath: string): Promise<Workspace> {
    const data = await fs.readFile(workspacePath, 'utf8');

    switch (path.parse(workspacePath).ext) {
      case '.json':
        return JSON.parse(data);

      case '.yaml':
      case '.yml':
        return YAML.parse(data);

      default:
        throw new Error('Could not parse schema, invalid extension used');
    }
  }

  public validateWorkspaceSchema(workspace: Workspace) {
    require('ajv-keywords')(this.ajv, ['regexp']);
    require('ajv-errors')(this.ajv);

    return this.ajv.validate(workspaceSchema, workspace);
  }

  public async validate() {
    const workspacePath = await find([
      'owe.yaml',
      'owe.yml',
      'owe.json',
    ], this.dir());

    if (!workspacePath) {
      throw new Error('Workspace definitions could not be found');
    }

    const workspace = await this.parseSchema(workspacePath);
    const valid = this.validateWorkspaceSchema(workspace);

    if (!valid) {
      console.log(this.ajv.errors);
      process.exit(1);
    } else {
      this.schema = workspace;
    }
  }
}