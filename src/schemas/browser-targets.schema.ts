import { BrowserTarget } from '../models';
import { toSchemaEnum } from './to-schema';

export const browserTargetsSchema = {
  items: toSchemaEnum(BrowserTarget),
  type: 'array',
  uniqueItems: true,
  minItems: 1,
};