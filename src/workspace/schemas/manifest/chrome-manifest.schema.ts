import { toTypeNumber, toTypeObject, toTypeString } from '../to-schema';

export const chromeManifestSchema = toTypeObject({
  additionalProperties: false,
  properties: {
    contentSecurityPolicy: toTypeString(),
    manifestVersion: toTypeNumber(),
    versionName: toTypeString(),
  },
});