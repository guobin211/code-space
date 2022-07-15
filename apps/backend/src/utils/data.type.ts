export type JSONValue = string | number | boolean | null | JSArray | JSObject;

export type JSONObject = Record<string, JSONValue>;

export type JSObject = Record<string, any>;

export type JSArray<T = any> = Array<T>;

export type Keys<T> = keyof T;
