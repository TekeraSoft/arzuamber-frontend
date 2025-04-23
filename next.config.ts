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
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "arzuamber.com",
    //     pathname: "/minio/**",
    //   },
    // ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    domains: ["www.facebook.com", "res.cloudinary.com"],
  },
} as import("next").NextConfig;

export default withNextIntl(nextConfig);
