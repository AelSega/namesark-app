import plugin from 'next-intl/plugin';

const withNextIntl = plugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Génération statique
  output: 'export' ? undefined : 'standalone',
}

export default withNextIntl(nextConfig);


