/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphcms.com', 'media.graphassets.com'],
  },
  webpack: (config) => {
    config.experiments.topLevelAwait = true
    return config
  },
}

module.exports = nextConfig
