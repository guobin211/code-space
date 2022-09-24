const withTM = require('next-transpile-modules')(['react-ui']);

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  }
};

const withPlugins = withTM(config);

module.exports = withPlugins;
