import { merge } from 'webpack-merge';
import devConfig from './webpack.dev.mjs';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const DEFAULT_PKG = {
  NAME: 'MyLib',
  VERSION: '0.0.1',
  TYPE: 'umd'
}

/**
 * webpack打包依赖库的配置
 * @param {import('webpack').Configuration} config
 * @param {object} pkg
 * @returns {import('webpack').Configuration}
 */
export const getPKGConfig = (config, pkg = DEFAULT_PKG) => {
  const { NAME = 'MyLib', VERSION = '0.0.1', TYPE = 'umd' } = pkg;
  return merge(devConfig, {
    output: {
      clean: true,
      library: NAME,
      libraryTarget: TYPE,
      filename: `${NAME}@${VERSION}.${TYPE}.js`,
      publicPath: '/'
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${NAME}@${VERSION}.${TYPE}.css`,
      })
    ],
    externals: [
      {
        // 字符串
        react: 'react',
        // 对象
        lodash: {
          commonjs: 'lodash',
          amd: 'lodash',
          root: '_',
        },
      },
    ]
  }, config)
}

export default getPKGConfig
