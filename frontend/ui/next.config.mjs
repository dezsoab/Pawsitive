import withNextIntl from "next-intl/plugin";

const nextIntlConfig = withNextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };

export default nextIntlConfig(nextConfig);
