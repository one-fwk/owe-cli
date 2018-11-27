import * as Ajv from 'ajv';

import { manifestSchema } from '../manifest.schema';

describe('manifestSchema', () => {
  let baseSchema: any;
  let validate: Ajv.ValidateFunction;
  let ajv: Ajv.Ajv;

  beforeEach(() => {
    ajv = new Ajv({ useDefaults: true });

    baseSchema = {
      name: '',
      version: '',
      author: '',
    };
  });

  it('should accept required properties without errors', () => {
    expect(ajv.validate(manifestSchema, baseSchema)).toBe(true);
  });

  describe('permissions', () => {
    it('should accept unique array of permissions', () => {
      expect(ajv.validate(manifestSchema, {
        ...baseSchema,
        permissions: [
          '1',
          '2',
        ],
      })).toBe(true);
    });

    it('should NOT have duplicate items', () => {
      expect(ajv.validate(manifestSchema, {
        ...baseSchema,
        permissions: [
          '1',
          '1',
        ],
      })).toBe(false);

      expect(ajv.errors).toMatchSnapshot();
    });

    it('should NOT accept anything but strings', () => {
      expect(ajv.validate(manifestSchema, {
        ...baseSchema,
        permissions: [
          '',
          null,
          1,
          {},
        ],
      })).toBe(false);

      expect(ajv.errors).toMatchSnapshot();
    });
  });
});