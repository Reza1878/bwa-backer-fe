/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["127.0.0.1", "192.168.1.7", "backer-api.rezarizqi.my.id"],
  },
};

module.exports = nextConfig;
