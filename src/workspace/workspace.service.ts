import { Injectable } from '@one/core';
import * as fs from 'fs-extra';
import Ajv from 'ajv';
import * as path from 'path';

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

  public dir(...paths: string[]) {
    return path.join(process.cwd(), ...paths);
  }

  public useProject(project: string) {
    if (!this.schema.projects[project]) {
      throw new Error(`Provided project ${project} is invalid and doesn't exist in your schematic.`);
    }

    this.project = this.schema.projects[project];
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

  public async validate() {
    const schemaPath = await findUp('owe.json', process.cwd());

    if (!schemaPath) {
      throw new Error('Workspace definitions could not be found');
    }

    const schemaDef = await fs.readJson(schemaPath);
    const valid = this.ajv.validate(workspaceSchema, schemaDef);

    if (!valid) {
      // handle errors here
    } else {
      this.schema = schemaDef;
    }
  }
}