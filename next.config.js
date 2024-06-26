/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  experimental: {
    appDir: true,
  }
};
