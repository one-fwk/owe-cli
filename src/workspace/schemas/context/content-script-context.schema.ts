import { baseContextSchema } from './base-context.schema';
import { uniqueArrayOfStrings } from '../to-schema';

export const contentScriptContextSchema = baseContextSchema({
  properties: {
    matches: uniqueArrayOfStrings(),
    allFrames: {
      type: 'boolean',
    },
  },
});