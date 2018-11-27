export * from './find-up';
export * from './snakerize';
export * from './rename-property';
export * from './filter-async';

export const toArray = <T>(arr: T | T[]): T[] => !Array.isArray(arr) ? [arr] : arr;