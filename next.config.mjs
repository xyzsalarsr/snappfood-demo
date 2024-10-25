/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: "https://snappfood.ir/search/api/v1/",
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
