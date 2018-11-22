import { ProjectType } from '../models';
import { toSchemaConstants } from './to-schema';

export const projectTypeSchema = {
  oneOf: toSchemaConstants(ProjectType),
  type: 'string',
};