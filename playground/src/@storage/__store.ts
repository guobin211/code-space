import { CallBack, Observer } from './__observer';
import { Database } from './__database';

export class Store<T> implements Observer<T> {
  private state: T;
  private preState: T;
  private autoIndex: number;
  private observer: Map<number, CallBack>;
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  clear() {
    this.observer.clear();
    this.autoIndex = 0;
  }

  getState<E extends T>(): E {
    return this.state as E;
  }

  setState<E extends T>(v: E) {
    this.preState = this.state;
    this.state = Object.assign({}, this.state, v);
  }

  subscribe(fn: CallBack): CallBack {
    const index = this.autoIndex + 1;
    this.observer.set(index, fn);
    this.autoIndex = index;
    return () => {
      this.observer.delete(index);
    };
  }
}
