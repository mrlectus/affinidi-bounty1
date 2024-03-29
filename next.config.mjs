/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beige-magnificent-chipmunk-792.mypinata.cloud',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
