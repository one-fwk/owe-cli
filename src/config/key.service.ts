import { Injectable } from '@one/core';
import uuidv1 from 'uuid/v1';

@Injectable()
export class KeyService {
  private readonly keys = new Map<string, string>();

  public generate(id: string) {
    const val = uuidv1();

    this.keys.set(id, val);

    return val;
  }

  public get(id: string) {
    if (!this.keys.has(id)) {
      throw new Error('No key has been generated with given id');
    }

    return this.keys.get(id);
  }
}