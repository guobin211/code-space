/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  eslint: {
    dirs: [],
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
