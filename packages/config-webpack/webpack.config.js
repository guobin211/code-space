/**
 * 基础配置
 * @type {import('webpack').Configuration}
 */
const baseConfig = {};

const mergeConfig = (config) => {
  return config;
};

const webpackConfig = mergeConfig(baseConfig);

export default webpackConfig;
