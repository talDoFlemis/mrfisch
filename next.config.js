/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "gmltbufzxjrgpbxxywpk.supabase.co",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
