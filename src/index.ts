/**
 * A map that has a type for its keys and values
 */
export class TypedMap<KV extends Array<any>> implements Iterable<KV> {
  #map = new Map();

  constructor(entries?: Iterable<KV>) {
    if (entries) {
      for (const [key, value] of entries) {
        this.#map.set(key, value);
      }
    }
  }

  [Symbol.iterator](): Iterator<KV, any, undefined> {
    // @ts-ignore
    return this.#map[Symbol.iterator]();
  }

  set<
    K extends KV[0]
  >(key: K, value: Extract<KV, [K, any]>[1]) {
    this.#map.set(key, value);
  }

  get<
    K extends KV[0]
  >(key: K): Extract<KV, [K, any]>[1] {
    return this.#map.get(key) as KV[K];
  }

  /**
   * Returns an iterable of key, value pairs for every entry in the map.
   */
  entries(): IterableIterator<KV> {
    //@ts-ignore
    return this.#map.entries();
  }

  /**
   * Returns an iterable of keys in the map
   */
  keys(): IterableIterator<KV[0]> {
    return this.#map.keys();
  }

  /**
   * Returns an iterable of values in the map
   */
  values(): IterableIterator<KV[1]> {
    return this.#map.values();
  }

  /**
   * Clears the map
   */
  clear() {
    this.#map.clear();
  }

  /**
   * Deletes the entry for the given key
   */
  delete<
    K extends KV[0]
  >(key: K): boolean {
    return this.#map.delete(key);
  }

  /**
   * Returns the number of entries in the map
   */
  get size() {
    return this.#map.size;
  }

  get esMap() {
    return this.#map;
  }


  static wrap<KV extends Array<any>>(
    map: TypedMap<KV> | Iterable<KV>
  ) {
    if (map instanceof TypedMap) {
      return map;
    }
    return new TypedMap(map);
  }
};
