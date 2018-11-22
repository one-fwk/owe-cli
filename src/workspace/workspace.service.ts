import { Injectable } from '@one/core';
import * as fs from 'fs-extra';
import Ajv from 'ajv';

import { workspaceSchema } from './schemas';
import { findUp } from '../util';

@Injectable()
export class WorkspaceService {
  private readonly ajv = new Ajv({
    useDefaults: true,
  });

  public async validateSchema() {
    const schemaPath = await findUp('owe.json', process.cwd());

    if (!schemaPath) {
      throw new Error('Workspace definitions could not be found');
    }

    const schemaDef = await fs.readJson(schemaPath);
    const validate = this.ajv.compile(workspaceSchema);

    // Workspace schema is invalid
    if (!validate(schemaDef)) {

    } else {

    }
  }
}