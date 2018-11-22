import { toSchemaEnum, toTypeArray } from './to-schema';
import { BrowserTarget } from '../../models';

export const browserTargetsSchema = toTypeArray({
  items: toSchemaEnum(BrowserTarget),
  uniqueItems: true,
  minItems: 1,
});