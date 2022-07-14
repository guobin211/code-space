import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import { getAssetsLoader, getCssLoader, getTsxLoader } from './webpack.common.mjs';

const MODE = 'development';
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: MODE,
  devtool: 'eval-cheap-module-source-map',
  target: ['web', 'es2015'],
  stats: 'errors-warnings',
  module: {
    rules: [
      ...getCssLoader(),
      ...getAssetsLoader(),
      getTsxLoader()
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux)[\\/]/,
          name: 'commons',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WebpackSwcTemplate',
    })
  ],
  output: {
    filename: 'webpack/js/[name].bundle.js',
    clean: true,
    publicPath: '/',
    wasmLoading: 'fetch',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
};

/**
 * @param otherConfig
 */
export function getDevConfig(otherConfig = {}) {
  process.env.NODE_ENV = MODE;
  return merge(config, otherConfig);
}

export default config;
