import { toTypeString } from '../to-schema';
import { baseContextSchema } from './base-context.schema';

export const popupContextSchema = baseContextSchema({
  minProperties: 1,
  properties: {
    template: toTypeString(),
    outputHtml: toTypeString(),
  },
});