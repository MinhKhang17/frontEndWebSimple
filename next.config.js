/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  i18n: {
    locales: ['vi'],
    defaultLocale: 'vi',
  },
  trailingSlash: false,
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
}

module.exports = nextConfig
