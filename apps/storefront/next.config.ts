import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitir imágenes locales de Medusa (localhost:9000) y cualquier origen HTTPS
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
    // En desarrollo local, carga directa ultra rápida sin proxy de servidor
    unoptimized: true,
  },
};

export default nextConfig;
