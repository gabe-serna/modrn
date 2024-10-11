/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/account",
        destination: "/account/profile",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
