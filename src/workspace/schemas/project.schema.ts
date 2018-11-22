import { filePathSchema } from './file-path.schema';
import { projectTypeSchema } from './project-type.schema';
import { browserTargetsSchema } from './browser-targets.schema';
import { toTypeString } from './to-schema';

export const projectSchema = {
  item: 'object',
  additionalProperties: false,
  properties: {
    sourceRoot: filePathSchema,
    outputPath: toTypeString(),
    tsConfig: toTypeString(),
    projectType: projectTypeSchema,
    browserTargets: browserTargetsSchema,
  },
  required: [
    'sourceRoot',
    'outputPath',
    'tsConfig',
    'projectType',
    'browserTargets',
  ]
};