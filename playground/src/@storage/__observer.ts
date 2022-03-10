export type CallBack<T = any> = (v?: T) => void;

export type Data = Record<string, any>;

export interface Observer<T = Data> {
  subscribe(fn: CallBack): CallBack;
  setState<E extends T>(v: E);
  getState<E extends T>(): E;
  clear();
}
