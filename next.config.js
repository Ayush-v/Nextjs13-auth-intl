/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/en",
  //       permanent: true,
  //     },
  //   ];
  // },
};

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n.ts"
);

module.exports = withNextIntl(nextConfig);
