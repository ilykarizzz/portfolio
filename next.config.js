/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'], // Add any external image domains you're using
  },
  // Environment variables that will be available on the client
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'https://karol-portfolio.vercel.app',
  }
};

module.exports = nextConfig;
