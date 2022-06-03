/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      "mongodb+srv://edward:dwaynEDO13@cluster0.5qi3v.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
