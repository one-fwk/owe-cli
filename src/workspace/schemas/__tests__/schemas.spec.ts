import { ValidateFunction } from 'ajv';
import * as Ajv from 'ajv';

import { MockSchema } from '../to-schema';
import { projectSchema } from '../project.schema';
import { filePathSchema } from '../file-path.schema';
import { projectTypeSchema } from '../project-type.schema';
import { browserTargetsSchema } from '../browser-targets.schema';

describe('Schema validation', () => {
  const ajv = new Ajv({
    useDefaults: true,
  });

  describe('projects', () => {
    let validate: ValidateFunction;
    let schema: MockSchema;

    const createTestProject = (name: string) => ({
      projects: {
        [name]: {},
      },
    });

    beforeAll(async () => {
      schema = new MockSchema(
        'owe.schema#workspaceSchema',
        ['project.schema#projectSchema']
      );

      const workspaceSchema = await schema.mock();
      validate = ajv.compile(workspaceSchema);
    });

    afterAll(() => {
      schema.unmock();
    });

    it('should accept name with underscore', () => {
      expect(validate(createTestProject('test_app'))).toBe(true);
    });

    it('should accept name with dash', () => {
      expect(validate(createTestProject('test-app'))).toBe(true);
    });

    it(`shouldn't accept illegal characters in name`, () => {
      expect(validate(createTestProject('test app # %'))).toBe(false);
    });
  });

  describe('schemas', () => {
    const validate = ajv.compile(projectSchema);

    it('project schema should accept properties', () => {
      expect(validate({
        sourceRoot: 'dist/appwriter',
        browserTargets: ['chrome'],
        projectType: 'extension',
      })).toBe(true);
    });

    describe('sourceRoot', () => {
      const validate = ajv.compile(filePathSchema);

      it('should fail if not valid path', () => {
        // doesnt work
        require('ajv-keywords/keywords/regexp')(ajv);
        expect(validate('dist/appwriter cloud')).toBe(false);
      });
    });

    describe('projectType', () => {
      const validate = ajv.compile(projectTypeSchema);

      it('should accept one of ProjectType values', () => {
        expect(validate('library')).toBe(true);
        expect(validate('extension')).toBe(true);
      });

      it('should fail if empty', () => {
        expect(validate('')).toBe(false);
      });
    });

    describe('browserTargets', () => {
      const validate = ajv.compile(browserTargetsSchema);

      it('should accept BrowserTarget values', () => {
        expect(validate(['chrome'])).toBe(true);
        expect(validate(['chrome', 'edge'])).toBe(true);
      });

      it('should fail if value is not in BrowserTarget', () => {
        expect(validate(['safari'])).toBe(false);
      });

      it('should fail if empty', () => {
        expect(validate([])).toBe(false);
      });

      it('should fail if duplicate targets', () => {
        expect(validate(['chrome', 'chrome'])).toBe(false);
      });
    });
  });
});