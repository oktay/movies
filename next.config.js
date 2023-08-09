/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
};

module.exports = nextConfig;
