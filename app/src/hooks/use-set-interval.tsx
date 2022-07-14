import { useRef, useEffect } from 'react';
import { CallBackFn } from './types';

export interface Options {
  delay: number;
  immediate?: boolean;
}

export function useSetInterval(call: CallBackFn, options: Options = { delay: 33 }): [CallBackFn] {
  const ref = useRef<number>();
  const clear = () => {
    window.clearInterval(ref.current);
  };

  useEffect(() => {
    const { delay, immediate } = options;
    if (immediate) {
      call();
    }
    ref.current = window.setInterval(() => {
      call();
    }, delay);
    return () => {
      clear();
    };
  }, [call, options.delay, options.immediate]);

  return [clear];
}
