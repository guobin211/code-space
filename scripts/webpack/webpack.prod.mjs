import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';
import { getAssetsLoader, getCssLoader, getTsxLoader } from './webpack.common.mjs';
import devConfig from './webpack.dev.mjs';

const MODE = 'production';
const prodConfig = merge(devConfig, {
  devtool: false,
  mode: MODE,
  target: ['web', 'es5'],
  stats: 'errors-warnings',
  output: {
    filename: 'webpack/js/[name].[contenthash].js',
    clean: true,
    publicPath: '/'
  },
  performance: {
    maxEntrypointSize: 500000
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux)[\\/]/,
          name: 'commons',
          chunks: 'all'
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
  module: {
    rules: [
      ...getCssLoader(MODE),
      ...getAssetsLoader(MODE),
      getTsxLoader()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'webpack/css/[name].[contenthash].css',
      chunkFilename: 'webpack/css/[id].[contenthash].css'
    })
  ],
  devServer: {}
});

export function getProdConfig(otherConfig = {}) {
  process.env.NODE_ENV = MODE;
  return merge(prodConfig, otherConfig);
}
