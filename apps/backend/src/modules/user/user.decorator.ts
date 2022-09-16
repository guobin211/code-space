import { dropProps } from '../../utils/mapper';

export function FromEntity<T extends { new (...args: any[]): object }>(
  constructor: T,
) {
  return class Inner extends constructor {
    /**
     * 把数据库实体中的敏感字段去除掉
     * @returns object
     */
    public toPublicJson<R>(): R {
      return dropProps(this as any, [
        'password',
        'hashPassword',
      ]) as unknown as R;
    }
  };
}
