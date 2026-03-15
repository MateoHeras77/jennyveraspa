import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/hifu',
        destination: '/servicios/estetica-facial/hifu',
        permanent: true,
      },
      {
        source: '/botox',
        destination: '/servicios/estetica-facial/botox',
        permanent: true,
      },
      {
        source: '/masaje-relajante',
        destination: '/servicios/estetica-corporal/masajes-relajantes',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
