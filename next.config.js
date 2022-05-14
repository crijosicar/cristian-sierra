/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiURL: process.env.API_URL,
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    mailgunEmail: process.env.MAILGUN_EMAIL,
    mailgunUsername: process.env.MAILGUN_USERNAME,
    personalEmail: process.env.PERSONAL_EMAIL,
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  api: {
    bodyParser: {
      sizeLimit: "1mb",
      responseLimit: "8mb",
    },
  },
};

module.exports = nextConfig;
