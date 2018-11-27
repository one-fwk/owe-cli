import { chromeManifestSchema } from './chrome-manifest.schema';
import { toTypeString, uniqueArrayOfStrings } from '../to-schema';

export const manifestSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: toTypeString(),
    author: toTypeString(),
    version: toTypeString(),
    description: toTypeString(),
    defaultLocale: toTypeString(),
    // @TODO: Needs fixing
    permissions: uniqueArrayOfStrings(),
    chrome: chromeManifestSchema,
    // edge: {},
    // firefox: {},
  },
  required: [
    'name',
    'author',
    'version',
    // 'description',
  ],
};