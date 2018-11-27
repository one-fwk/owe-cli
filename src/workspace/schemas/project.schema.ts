import { contextSchema } from './context';
import { manifestSchema } from './manifest';
import { projectTypeSchema } from './project-type.schema';
import { browserTargetsSchema } from './browser-targets.schema';
import { filePathSchema, jsonFileSchema, toTypeString } from './to-schema';

export const projectSchema = {
  item: 'object',
  additionalProperties: false,
  properties: {
    sourceRoot: filePathSchema('Must be a path to a valid source directory'),
    outputPath: toTypeString(),
    tsConfig: jsonFileSchema('Must be a path to a valid tsconfig file'),
    projectType: projectTypeSchema,
    browserTargets: browserTargetsSchema,
    manifest: manifestSchema,
    contexts: contextSchema,
  },
  required: [
    'sourceRoot',
    'outputPath',
    'tsConfig',
    'projectType',
    'browserTargets',
    'manifest',
  ],
};