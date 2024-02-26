Typescript strongly typed Map.

Typescript comes with a generic Map<K, V> type which allows you to set a fixed type for the Keys and another for the Values. This is enough for most cases but sometimes you need more granularity as to which tuples are allowed in the map.

## Installation

```
npm install @jfromaniello/typedmap
```

## Usage

```ts
import { TypedMap } from 'typedmap';

type KeyValue =
  ['foo' | 'bar', string] |
  [number, string] |
  ['person', Person];

const map = new TypedMap<KeyValue>();

// Valid examples
map.set('foo', 'hello');
map.set(1, 'world');
map.set('person', new Person());

// Invalid examples
// new Map([['person', 123]]);
// map.set('foo', 'test');
// map.get('fiii');
```

## License

MIT - 2024 José F. Romaniello
