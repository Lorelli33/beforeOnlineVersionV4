/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'i.imgur.com',
      'raw.githubusercontent.com',
      'assets.coincap.io',
      'cryptologos.cc',
      'ltltmijkopngifadxxva.supabase.co'
    ],
  },
  async redirects() {
    return [
      {
        source: '/flight-tracker',
        destination: '/web3/flight-tracker',
        permanent: true,
      },
      {
        source: '/nft-collection',
        destination: '/web3/nft-collection',
        permanent: true,
      },
      {
        source: '/ico',
        destination: '/web3/ico',
        permanent: true,
      },
      {
        source: '/ai-travel-agent',
        destination: '/web3/ai-travel-agent',
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false; // Disable webpack caching in development
    }
    return config;
  },
};

module.exports = nextConfig;