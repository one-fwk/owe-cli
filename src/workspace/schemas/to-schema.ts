import { join } from 'path';

export type Const<T> = { const: T };
export type Enum<T> = { enum: T };
export type Type = 'string' | 'object' | 'array' | 'number' | 'boolean';

export const toType = (type: Type) => (schema: any = {}) => ({ ...schema, type });

export const toTypeString = toType('string');
export const toTypeArray = toType('array');
export const toTypeObject = toType('object');
export const toTypeNumber = toType('number');

export const uniqueArray = (items: any) => (schema = {}) => toTypeArray({
  uniqueItems: true,
  items,
  ...schema,
});

export const filePathSchema = (errorMessage: string) => toTypeString({
  regexp: '/^[a-z]:((\\/|(\\\\?))[\\w .]+)/i',
  errorMessage,
});

export const jsonFileSchema = (errorMessage: string) => toTypeString({
  regexp: '/^[a-z]:((\\/|(\\\\?))[\\w .]+)+\\.json/i;',
  errorMessage,
});

export const uniqueArrayOfStrings = uniqueArray(toTypeString());

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