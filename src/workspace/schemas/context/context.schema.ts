import { backgroundContextSchema } from './background-context.schema';
import { contentScriptContextSchema } from './content-script-context.schema';
import { popupContextSchema } from './popup-context.schema';
import { toTypeObject, uniqueArray } from '../to-schema';

export const contextSchema = toTypeObject({
  additionalProperties: false,
  minProperties: 1,
  properties: {
    popup: popupContextSchema,
    background: backgroundContextSchema,
    // @TODO: Needs testing
    contentScripts: uniqueArray(contentScriptContextSchema),
  },
});