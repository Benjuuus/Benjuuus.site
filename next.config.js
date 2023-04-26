/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.akamai.steamstatic.com'
      }
    ],
    domains: ['avatars.akamai.steamstatic.com', 'www.benjuuus.site', 'benjuuus.site']
  }
}
