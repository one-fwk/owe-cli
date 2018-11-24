import { renameProperty } from '../rename-property';

describe('renameProperty', () => {
  it('should rename property without losing value', () => {
    const obj = {
      first: true,
    };

    expect(renameProperty(obj, 'first', 'second')).toMatchObject({
      // first: undefined,
      second: true,
    });
  });
});