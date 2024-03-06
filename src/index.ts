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

  /**
   *
   * Sets the value for the key in the map
   *
   * @param key - The key to set the value for
   * @param value - The value to set
   */
  set<
    K extends KV[0]
  >(key: K, value: Extract<KV, [K, any]>[1]) {
    this.#map.set(key, value);
  }

  /**
   *
   * Returns the value associated to the key, or undefined if there is none
   *
   * @param key - The key to get the value for
   * @returns - The value associated to the key, or undefined if there is none
   */
  get<
    K extends KV[0]
  >(key: K): Extract<KV, [K, any]>[1] | undefined {
    return this.#map.get(key) as KV[K];
  }

  /**
   * Returns an iterable of key, value pairs for every entry in the map.
   *
   * @returns - An iterable of key, value pairs for every entry in the map
   */
  entries(): IterableIterator<KV> {
    //@ts-ignore
    return this.#map.entries();
  }

  /**
   * Returns an iterable of keys in the map
   *
   * @returns - An iterable of keys in the map
   */
  keys(): IterableIterator<KV[0]> {
    return this.#map.keys();
  }

  /**
   * Returns an iterable of values in the map
   *
   * @returns - An iterable of values in the map
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
   *
   * @param key - The key to delete
   * @returns Whether the key was deleted
   */
  delete<
    K extends KV[0]
  >(key: K): boolean {
    return this.#map.delete(key);
  }

  /**
   *
   * Checks if the map has an entry for the given key
   *
   * @param key - The key to check for
   * @returns Whether the map has an entry for the given key
   */
  has<
    K extends KV[0]
  >(key: K): boolean {
    return this.#map.has(key);
  }

  /**
   * Returns the number of entries in the map
   */
  get size() {
    return this.#map.size;
  }

  /**
   * Returns the internal ES map
   */
  get esMap() {
    return this.#map;
  }

  static wrap<KV extends Array<any>>(
    map: TypedMap<KV> | Iterable<KV> | undefined
  ) {
    if (typeof map === 'undefined') {
      return new TypedMap<KV>();
    }
    if (map instanceof TypedMap) {
      return map;
    }
    return new TypedMap(map);
  }

  [Symbol.for('nodejs.util.inspect.custom')](
    depth: number | null,
    options: { [key: string]: any },
    inspect: (obj: any, options: { [key: string]: any }) => string
  ) {
    const className = this.constructor.name;
    if (depth !== null && depth < 0) {
      return options.stylize(`[${className}]`, 'special');
    }
    const newOptions = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1,
    });
    const padding = ' '.repeat(className.length + 2);
    const inner = inspect(this.esMap, newOptions)
      .replace(/\n/g, `\n${padding}`);
    return `${options.stylize(className, 'special')}< ${inner} >`;
  }
};
