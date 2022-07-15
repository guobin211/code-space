import { Keys } from './data.type';

/**
 * object to drop properties
 * @param o object
 * @param p string[]
 * @returns object
 */
export function dropProps<R extends object, T extends object = any>(
  o: T,
  ...p: Keys<T>[]
): R {
  return Object.keys(o).reduce((acc, k) => {
    if (!p.includes(k as Keys<T>)) {
      acc[k] = o[k];
    }
    return acc;
  }, {}) as R;
}
