import { Injectable } from '@one/core';
import * as crypto from 'crypto';

@Injectable()
export class HashService {
  private readonly hash = new Map<string, string>();

  public generate(id: string) {
    const val = this.toFileName(
      crypto.createHash('md5').update(id).digest('hex'),
    );

    this.hash.set(id, val);

    return val;
  }

  public entries() {
    return [...this.hash.values()];
  }

  private toFileName(hash: string) {
    return `main-${hash}.ts`;
  }

  /*public generateFileName(id: string) {
    const id = this.generate(id);
  }*/

  public get(id: string) {
    if (!this.hash.has(id)) {
      throw new Error('No hash has been generated with given id');
    }

    return this.hash.get(id);
  }
}