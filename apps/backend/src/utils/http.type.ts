import { JSObject } from './data.type';

export interface WebResponse<T extends JSObject = any> {
  code: number;
  data: T;
  msg: string;
}
