/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        // protocol: '**',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/drrcsolst/**',
      },
      {
        // protocol: '**',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dhniypunw/**',
      },
      {
        // protocol: '**',
        hostname: 'rphang.i.luutrurp.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
