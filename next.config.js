/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  },
};

module.exports = nextConfig;
