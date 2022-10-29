const IS_PROD = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: !IS_PROD,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: [],
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
