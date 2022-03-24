export class NodeJSStorage implements Storage {
  length: number;
  private data: Map<string, any>;

  constructor() {
    this.length = 0;
    this.data = new Map<string, any>();
  }

  clear(): void {
    this.data.clear();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this.data.get(key);
  }

  key(index: number): string | null {
    return undefined;
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

export class Database {
  #localStorage: Storage;

  constructor() {
    if (typeof window !== 'undefined') {
      this.#localStorage = window.localStorage;
    } else {
      this.#localStorage = new NodeJSStorage();
    }
  }

  get length() {
    return this.#localStorage.length;
  }

  clear(): void {
    this.#localStorage.clear();
  }

  getItem(key: string): string | null {
    return this.#localStorage.getItem(key);
  }

  key(index: number): string | null {
    return this.#localStorage.key(index);
  }

  removeItem(key: string): void {
    this.#localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.#localStorage.setItem(key, value);
  }
}
