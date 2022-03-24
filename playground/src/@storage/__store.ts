import { Database } from './__database';
import { CallBack, Observer } from './__observer';

export class Store<T> implements Observer<T> {
  #state: T;
  #preState: T;
  #autoIndex: number;
  #observer: Map<number, CallBack>;
  #database: Database;

  constructor() {
    this.#database = new Database();
  }

  clear() {
    this.#observer.clear();
    this.#autoIndex = 0;
  }

  getState<E extends T>(): E {
    return this.#state as E;
  }

  setState<E extends T>(v: E) {
    this.#preState = this.#state;
    this.#state = Object.assign({}, this.#state, v);
    this.#notify();
  }

  subscribe(fn: CallBack): CallBack {
    if (typeof fn !== 'function') {
      throw new Error('subscribe must be a function');
    }
    const index = this.#autoIndex + 1;
    this.#observer.set(index, fn);
    this.#autoIndex = index;
    return () => {
      this.#observer.delete(index);
    };
  }

  #notify() {
    this.#observer.forEach((fn) => {
      fn(this.#state);
    });
  };
}
