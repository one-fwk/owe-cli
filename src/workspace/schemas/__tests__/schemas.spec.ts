import { ValidateFunction } from 'ajv';
import * as Ajv from 'ajv';

import { filePathSchema, MockSchema } from '../to-schema';
import { projectSchema } from '../project.schema';
import { projectTypeSchema } from '../project-type.schema';
import { browserTargetsSchema } from '../browser-targets.schema';

describe('Schema validation', () => {
  let ajv: Ajv.Ajv;

  beforeEach(() => {
    ajv = new Ajv({
      useDefaults: true,
    });
  });

  describe('projects', () => {
    let workspaceSchema: any;
    let validate: ValidateFunction;
    let schema: MockSchema;

    const createTestProject = (name: string) => ({
      projects: {
        [name]: {},
      },
    });

    beforeEach(async () => {
      schema = new MockSchema(
        'owe.schema#workspaceSchema',
        ['project.schema#projectSchema']
      );

      workspaceSchema = await schema.mock();
    });

    afterAll(() => {
      schema.unmock();
    });

    it('should accept name with underscore', () => {
      expect(ajv.validate(
        workspaceSchema,
        createTestProject('test_app')),
      ).toBe(true);
    });

    it('should accept name with dash', () => {
      expect(ajv.validate(
        workspaceSchema,
        createTestProject('test-app')),
      ).toBe(true);
    });

    it(`shouldn't accept illegal characters in name`, () => {
      expect(ajv.validate(
        workspaceSchema,
        createTestProject('test app # %')),
      ).toBe(false);

      expect(ajv.errors).toMatchSnapshot();
    });
  });

  describe('schemas', () => {
    it('project schema should accept properties', () => {
      expect(ajv.validate(projectSchema,{
        sourceRoot: 'dist/appwriter',
        browserTargets: ['chrome'],
        projectType: 'extension',
      })).toBe(true);
    });

    describe('sourceRoot', () => {
      it('should fail if not valid path', () => {
        // doesn't work
        require('ajv-keywords')(ajv, ['regexp']);
        expect(ajv.validate(
          filePathSchema(''),
          'dist/appwriter?cloud'),
        ).toBe(false);

        expect(ajv.errors).toMatchSnapshot();
      });
    });

    describe('projectType', () => {
      it('should accept one of ProjectType values', () => {
        ['library', 'extension'].forEach(type => {
          expect(ajv.validate(projectTypeSchema, type)).toBe(true);
        });
      });

      it('should fail if empty', () => {
        expect(ajv.validate(projectTypeSchema,'')).toBe(false);
        expect(ajv.errors).toMatchSnapshot();
      });
    });

    describe('browserTargets', () => {
      it('should accept BrowserTarget values', () => {
        [['chrome'], ['chrome', 'edge']].forEach(targets => {
          expect(ajv.validate(browserTargetsSchema, targets)).toBe(true);
        });
      });

      it('should fail if value is not in BrowserTarget', () => {
        expect(ajv.validate(browserTargetsSchema, ['safari'])).toBe(false);
        expect(ajv.errors).toMatchSnapshot();
      });

      it('should fail if empty', () => {
        expect(ajv.validate(browserTargetsSchema, [])).toBe(false);
        expect(ajv.errors).toMatchSnapshot();
      });

      it('should fail if duplicate targets', () => {
        expect(ajv.validate(browserTargetsSchema, ['chrome', 'chrome'])).toBe(false);
        expect(ajv.errors).toMatchSnapshot();
      });
    });
  });
});