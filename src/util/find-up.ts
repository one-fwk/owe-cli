import * as path from 'path';
import * as fs from 'fs-extra';

export async function find(names: string[], from: string) {
  for (const name of names) {
    const p = path.join(from, name);

    if (await fs.pathExists(p)) {
      return p;
    }
  }

  return null;
}

export async function findUp(names: string | string[], from: string) {
  if (!Array.isArray(names)) {
    names = [names];
  }

  const { root } = path.parse(from);

  let currentDir = root;
  while (currentDir && currentDir !== root) {
    for (const name of names) {
      const p = path.join(currentDir, name);

      if (await fs.pathExists(p)) {
        return p;
      }

      currentDir = path.dirname(currentDir);
    }
  }

  return null;
}