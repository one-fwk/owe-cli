import { join } from 'path';

type Const<T> = { const: T };
type Enum<T> = { enum: T };

export function toSchemaConstants<T>(obj: Object): Const<T>[] {
  return (<any>Object).values(obj).map((value: T) => ({
    const: value,
  }));
}

export function toSchemaEnum<T>(obj: Object): Enum<T>[] {
  return [
    {
      enum: (<any>Object).values(obj),
    },
  ];
}

export class MockSchema {
  constructor(
    private readonly schema: string,
    private readonly mockSchemas: string[],
  ) {}

  private getPath(schema: string) {
    const paths = schema.split('#');

    return {
      path: join(__dirname, paths[0]),
      exported: paths[1],
    };
  }

  public async mock<T>(): Promise<T> {
    this.mockSchemas.forEach(schema => {
      const { path, exported } = this.getPath(schema);

      jest.doMock(path, () => ({
        [exported]: {
          type: 'object',
        },
      }));
    });

    const { path, exported } = this.getPath(this.schema);
    return (await import(path))[exported];
  }

  public unmock() {
    this.mockSchemas.forEach(schema => {
      jest.unmock(this.getPath(schema).path);
    });
  }
}