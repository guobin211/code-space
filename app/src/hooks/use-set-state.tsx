import { useCallback, useState } from 'react';
import { DataObject } from './types';

export type SetStateFn = (state: DataObject) => void;
export type Patcher<T> = (state: Partial<T>) => T | Partial<T>;

export function useSetState<T extends DataObject>(initialState: T): [T, SetStateFn] {
  const [state, setState] = useState<T>(initialState);
  const setStateCallback = useCallback((patch: Patcher<T>) => {
    setState(prevState => {
      const nextState = typeof patch === 'function' ? patch(prevState) : patch;
      for (const key in nextState) {
        if (nextState[key] !== prevState[key]) {
          return Object.assign({}, prevState, nextState);
        }
      }
      return prevState;
    });
  }, []);
  return [state, setStateCallback];
}
