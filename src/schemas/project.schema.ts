import { filePathSchema } from './file-path.schema';
import { projectTypeSchema } from './project-type.schema';
import { browserTargetsSchema } from './browser-targets.schema';

export const projectSchema = {
  item: 'object',
  additionalProperties: false,
  properties: {
    sourceRoot: filePathSchema,
    browserTargets: browserTargetsSchema,
    projectType: projectTypeSchema,
  },
  required: ['browserTargets', 'projectType']
};