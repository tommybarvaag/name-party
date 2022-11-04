/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    newNextLinkBehavior: true,
    serverComponentsExternalPackages: ["prisma"],
  },
};
export default config;
