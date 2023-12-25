/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: '/Platform/:path*',
      destination: '/api/Platform/:path*'
    }
  ]
}

module.exports = nextConfig
