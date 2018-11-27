import * as deepMerge from 'deepmerge';
import { toTypeObject, toTypeString } from '../to-schema';

export function baseContextSchema(schema = {}) {
  return deepMerge(schema, toTypeObject({
    additionalProperties: false,
    properties: {
      entryModule: toTypeString(),
      entry: toTypeString(),
      outputFile: toTypeString(),
    },
    required: [
      'entry',
      'outputFile',
    ],
  }));
}