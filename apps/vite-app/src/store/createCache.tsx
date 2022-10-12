export class Cache {
  option: CacheOptions;
  storage: Storage;
  keys: Set<string>;
  constructor(option: CacheOptions) {
    this.option = option;
    switch (this.option.type) {
      case 'SESSION':
        this.storage = sessionStorage;
        break;
      case 'LOCAL_STORAGE':
        this.storage = localStorage;
        break;
      case 'MEMORY':
        this.storage = new MemoryStorage();
        break;
      default:
        this.storage = localStorage;
        break;
    }

    this.keys = new Set();
  }

  setItem(key: string, value: string) {
    this.keys.add(key);
    this.storage.setItem(key, value);
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
    this.keys.delete(key);
  }

  value() {
    const res: Record<string, string | null> = {};
    this.keys.forEach((key) => {
      const value = this.storage.getItem(key);
      res[key] = value;
    });
    return res;
  }

  clear() {
    this.storage.clear();
  }
}

class MemoryStorage implements Storage {
  data: Map<string, string>;
  length: number;
  constructor() {
    this.data = new Map();
    this.length = 0;
  }
  clear(): void {
    this.data = new Map();
    this.length = 0;
  }
  getItem(key: string): string | null {
    return this.data.get(key) || null;
  }
  key(index: number): string | null {
    return Array.from(this.data.keys())[index] || null;
  }
  removeItem(key: string): void {
    this.data.delete(key);
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

export type CacheType = 'SESSION' | 'LOCAL_STORAGE' | 'MEMORY';

export interface CacheOptions {
  type?: CacheType;
  clearOnExit?: boolean;
}

export function createCache(option: CacheOptions = {}) {
  if (IS_SERVER) {
    return new Cache({ type: 'MEMORY' });
  }
  return new Cache(option);
}

export const IS_SERVER = typeof localStorage === 'undefined' || typeof window === 'undefined';
