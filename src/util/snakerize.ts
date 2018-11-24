import { Utils } from '@one/core';
import { snakeCase } from 'voca';

import { renameProperty } from './rename-property';

export function snakerize(keys: any[], obj: any) {
  const traverse = (parent: any, next: any) => {
    if (Utils.isString(next) && !Utils.isNil(next)) {
      const newKey = snakeCase(next);
      renameProperty(parent, next, newKey);

    } else if (Array.isArray(next)) {
      next.forEach(n => traverse(parent, n));

    } else if (Utils.isObject(next)) {
      Object.keys(next).forEach(prop => {
        traverse(parent[prop], next[prop]);
      });
    }
  };

  keys.forEach(key => {
    traverse(obj, key);
  });

  return obj;
}