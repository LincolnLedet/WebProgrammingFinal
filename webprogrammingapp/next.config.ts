import type { NextConfig } from "next";

const path = require('path');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
      includePaths: [path.join(__dirname, 'src/styles')],
      prependData: `@import "variables.scss";`,
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: '**',
              port: '',
              pathname: '**',
          },
      ],
  },
};

export default nextConfig;