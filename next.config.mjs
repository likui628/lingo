/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: 'Access-Control-Expose-Headers',
            value: 'Content-Range',
          },
          {
            key: 'Content-Range',
            value: 'bytes: 0-9/*',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
