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
    if (typeof index !== 'number') {
      throw new Error('Index must be a number');
    }
    const keys = Array.from(this.data.keys());
    if (index >= keys.length || index < 0) {
      console.error(`Index ${index} is out of range`);
      return null;
    }
    return keys[index];
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

export class Database {
  _localStorage: Storage;

  constructor() {
    if (typeof window !== 'undefined') {
      this._localStorage = window.localStorage;
    } else {
      this._localStorage = new NodeJSStorage();
    }
  }

  get length() {
    return this._localStorage.length;
  }

  clear(): void {
    this._localStorage.clear();
  }

  getItem(key: string): string | null {
    return this._localStorage.getItem(key);
  }

  key(index: number): string | null {
    return this._localStorage.key(index);
  }

  removeItem(key: string): void {
    this._localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this._localStorage.setItem(key, value);
  }
}
