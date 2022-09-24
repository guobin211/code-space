import { rollup, RollupOptions } from 'rollup';

export interface EasyBuilderOptions {
  mode: 'development' | 'production' | unknown;
  input: string;
  output: string;
  format: 'cjs' | 'esm' | 'iife' | 'umd';
  name: string;
  watch?: boolean;
}

function mergeOption(options: EasyBuilderOptions): RollupOptions {
  const base: RollupOptions = {
    input: {},
    output: {},
    external: [],
  };
  return Object.assign({}, base, options);
}

/**
 * 创建rollup配置
 * @param options
 */
export function getOptions(options: EasyBuilderOptions): RollupOptions {
  return mergeOption(options);
}

/**
 * rollup打包
 * @param options
 */
export async function build(options: EasyBuilderOptions) {
  const { input, format, name, output } = options;
  return rollup({
    input: {
      file: input,
    },
    output: {
      format,
      name,
      file: output,
    },
  });
}

export default build;
