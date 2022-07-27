/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  env: {
    appUrl: process.env.APP_URL,
  },
};

module.exports = nextConfig;
