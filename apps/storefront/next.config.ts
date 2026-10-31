import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Desactiva cabecera de tecnología por seguridad y reducción de bytes
  poweredByHeader: false,
  // Compresión gzip/brotli nativa activada
  compress: true,
  images: {
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
    // unoptimized: true evita que el proceso Node.js ejecute Sharp en la CPU
    // del servidor cada vez que un bot o usuario solicita una imagen, previniendo
    // saturación de CPU y reinicios por falta de memoria (OOM).
    unoptimized: true,
  },
  // Cabeceras HTTP de alto rendimiento para cache en CDN y navegadores
  async headers() {
    return [
      {
        source: "/home/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
