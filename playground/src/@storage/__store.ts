import { Database } from './__database';
import { CallBack, Observer } from './__observer';

export class Store<T> implements Observer<T> {
  _state: T;
  _preState: T;
  _index: number;
  _observer: Map<number, CallBack>;
  _db: Database;

  constructor() {
    this._db = new Database();
  }

  clear() {
    this._observer.clear();
    this._index = 0;
  }

  getState<E extends T>(): E {
    return this._state as E;
  }

  setState<E extends T>(v: E) {
    this._preState = this._state;
    this._state = Object.assign({}, this._state, v);
    this._notify();
  }

  subscribe(fn: CallBack): CallBack {
    if (typeof fn !== 'function') {
      throw new Error('subscribe must be a function');
    }
    const index = this._index + 1;
    this._observer.set(index, fn);
    this._index = index;
    return () => {
      this._observer.delete(index);
    };
  }

  _notify() {
    this._observer.forEach((fn) => {
      fn(this._state);
    });
  };
}
