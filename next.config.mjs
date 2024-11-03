/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: "https://snappfood.ir/search/api/v1/",
    NEXT_PUBLIC_POSTHOG_KEY: "phc_mTV05ZJgZb23RrojDAv3cQKVmg8K13lQo3E12VCg1E8",
    NEXT_PUBLIC_POSTHOG_HOST: "https://us.i.posthog.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.snappfood.ir",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.zoodfood.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
