import { toTypeString } from './to-schema';

export const filePathSchema = toTypeString({
  // doesn't work weird
  regex: '[^\\0]+',
});