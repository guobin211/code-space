import { Keys } from './data.type';

const emptyObject = {};
export type EmptyObject = typeof emptyObject;
export type JSONValue = number | string | boolean | null;
export type JSONArray = JSONValue[] | JSONObject[];
export type JSONObject = Record<string, JSONValue | JSONArray>;
export type JSObject = Record<string, any>;
export type AnyObject = object;

/**
 * object to drop properties
 * @param o object
 * @param p string[]
 * @returns object
 */
export function dropProps<R extends AnyObject = any, T extends AnyObject = any>(
  o: T,
  p: Keys<T>[],
): R {
  if (o && typeof o === 'object' && Array.isArray(p)) {
    return Object.keys(o).reduce((acc, k) => {
      if (!p.includes(k as Keys<T>)) {
        acc[k] = o[k];
      }
      return acc;
    }, {}) as R;
  }
  return {} as R;
}
