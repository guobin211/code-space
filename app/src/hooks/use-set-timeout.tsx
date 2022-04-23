import { Options } from './use-set-interval';
import { CallBackFn } from './types';
import { useEffect, useRef } from 'react';

export function useSetTimeout(call: CallBackFn, options: Options = { delay: 33 }): [CallBackFn] {
  const ref = useRef<number>();
  const clear = () => {
    window.clearTimeout(ref.current);
  };

  useEffect(() => {
    const { delay, immediate } = options;
    if (immediate) {
      call();
    }
    ref.current = window.setTimeout(() => {
      call();
    }, delay);
    return () => {
      clear();
    };
  }, [call, options.delay, options.immediate]);

  return [clear];
}
