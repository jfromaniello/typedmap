import { TypedMap } from '../src/index';
import { inspect } from 'node:util';

describe('typed map', () => {
  type TestType =
    ['a', number] |
    ['b', number] |
    [1, string];
  let map: TypedMap<TestType>;

  beforeEach(() => {
    map = new TypedMap<TestType>([['a', 5]]);
  })

  it('should return the expected value on get', () => {
    expect(map.get('a')).toBe(5);
  });

  it('should return undefined when the key does not exists', () => {
    expect(map.get('b')).toBe(undefined);
  });

  it('should properly return the entries', () => {
    expect([...map.entries()]).toEqual([['a', 5]]);
  });

  it('should properly return the keys', () => {
    expect([...map.keys()]).toEqual(['a']);
  });

  it('should properly return the values', () => {
    expect([...map.values()]).toEqual([5]);
  });

  it('should properly delete a key', () => {
    map.delete('a');
    expect(map.get('a')).toBe(undefined);
  });

  it('should properly set a key', () => {
    map.set('b', 10);
    expect(map.get('b')).toBe(10);
  });

  it('should properly return the size', () => {
    expect(map.size).toBe(1);
  });

  it('should properly clear the map', () => {
    map.clear();
    expect(map.size).toBe(0);
  });

  it('should properly convert to array', () => {
    expect([...map]).toEqual([['a', 5]]);
  })

  it('should be able to convert to a map', () => {
    const m = map.esMap;
    expect(m.get('a')).toBe(5);
  });

  it('should be able to wrap', () => {
    const m = TypedMap.wrap(map);
    expect(m.get('a')).toBe(5);
  });

  it('should properly implement the inspect function', () => {
    const map = new TypedMap<TestType>([
      ['a', 5],
      ['b', 10],
      [1, 'c']
    ]);
    expect(inspect(map)).toMatchInlineSnapshot(`"TypedMap< Map(3) { 'a' => 5, 'b' => 10, 1 => 'c' } >"`);
  });
});
