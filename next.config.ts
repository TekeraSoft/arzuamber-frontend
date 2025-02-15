import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ❌ TypeScript hatalarını build sırasında engelle
  },
  eslint: {
    ignoreDuringBuilds: true, // ❌ ESLint hatalarını build sırasında engelle
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "192.168.1.119",
        port: "9000",
      },
    ],
  },
} as import("next").NextConfig;

export default withNextIntl(nextConfig);
