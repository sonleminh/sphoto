/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
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
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
