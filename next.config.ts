import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placeholder.com' },
      { protocol: 'https', hostname: 'www-cdn.plant-for-the-planet.org' },
      { protocol: 'https', hostname: 'pub-261389c3bd084eb3a62686b2f08ce42b.r2.dev' },
    ],
  },
};

export default withNextIntl(nextConfig);
