import { Cache, createCache } from './createCache';

const STORE_KEY = '__sync_store__';

type FunctionUpdate<T> = (prev: T) => T;
type ValueUpdate<T> = Partial<T>;
export interface Store<T> {
  subscribe: (listener: (state: T) => void) => () => void;
  getState: () => T;
  setState: (patch: Patcher<T>) => void;
  getLocalState: () => T;
  syncLocalState: () => void;
}
export type Patcher<T> = FunctionUpdate<T> | ValueUpdate<T>;

/**
 * 创建一个store
 * @param initialState {object} initial state
 * @returns
 */
export function createStore<T>(initialState: T): Store<T> {
  const listeners = new Set<(state: T) => void>();
  let cache: Cache;
  let currentState: T = initialState;
  const subscribe = (listener: (state: T) => void) => {
    listeners.add(listener);
    listener(currentState);
    return () => listeners.delete(listener);
  };

  const saveToCache = () => {
    if (!cache) {
      cache = createCache();
    }
    try {
      cache.setItem(STORE_KEY, JSON.stringify(currentState));
    } catch (e) {
      console.log(`[store] write cache error: ${e}`);
    }
  };

  const getLocalState = () => {
    if (!cache) {
      cache = createCache();
    }
    const value = cache.getItem(STORE_KEY);
    return Object.assign({}, currentState, JSON.parse(value || '{}'));
  };

  const setState = (patch: FunctionUpdate<T> | ValueUpdate<T>) => {
    if (!patch) {
      return;
    }
    if (typeof patch === 'function') {
      currentState = patch(currentState);
    } else {
      currentState = { ...currentState, ...patch };
    }
    saveToCache();
    listeners.forEach((listener) => listener(currentState));
  };

  return {
    subscribe,
    getLocalState: getLocalState,
    syncLocalState: () => {
      setState(getLocalState());
    },
    getState: () => currentState,
    setState: setState,
  };
}
