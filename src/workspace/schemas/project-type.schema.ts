import { toSchemaConstants, toTypeString } from './to-schema';
import { ProjectType } from '../../models';

export const projectTypeSchema = toTypeString({
  oneOf: toSchemaConstants(ProjectType),
});