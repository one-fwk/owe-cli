import { projectSchema } from './project.schema';

export const workspaceSchema = {
  item: 'object',
  additionalProperties: false,
  properties: {
    projects: {
      uniqueItems: true,
      additionalProperties: false,
      patternProperties: {
        '^[a-z0-9_-]{3,15}$': projectSchema,
      },
    },
  },
  required: ['projects'],
};