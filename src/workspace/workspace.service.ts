import { Injectable } from '@one/core';
import * as fs from 'fs-extra';
import Ajv from 'ajv';
import * as path from 'path';
import * as YAML from 'yaml';

import { BrowserTarget, Project, Workspace } from '../models';
import { workspaceSchema } from './schemas';
import { findUp } from '../util';

@Injectable()
export class WorkspaceService {
  public schema!: Workspace;
  public project!: Project;
  public browser!: BrowserTarget;

  private readonly ajv = new Ajv({
    useDefaults: true,
  });

  public getSourceRoot() {
    return this.dir(this.project.sourceRoot);
  }

  /**
   * Returns a copy of project
   */
  public getProject(): Project {
    return { ...this.project };
  }

  /**
   * Returns an absolute path relative to CWD
   */
  public dir(...paths: string[]) {
    return path.join(process.cwd(), ...paths);
  }

  public useProject(project: string) {
    if (!this.schema.projects[project]) {
      throw new Error(`Provided project ${project} is invalid and doesn't exist in your schematic.`);
    }

    // Never directly manipulate the project object
    this.project = Object.freeze(this.schema.projects[project]);
  }

  public targetBrowser(browser: BrowserTarget) {
    if (!(browser in BrowserTarget)) {
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
    return this.ajv.validate(workspaceSchema, workspace);
  }

  public async validate() {
    const workspacePath = await findUp([
      'owe.yaml',
      'owe.yml',
      'owe.json',
    ], process.cwd());

    if (!workspacePath) {
      throw new Error('Workspace definitions could not be found');
    }

    const workspace = await this.parseSchema(workspacePath);
    const valid = this.validateWorkspaceSchema(workspace);

    if (!valid) {
      // handle errors here
    } else {
      this.schema = workspace;
    }
  }
}