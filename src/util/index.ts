export * from './find-up';

export const toArray = <T>(arr: T | T[]): T[] => !Array.isArray(arr) ? [arr] : arr;