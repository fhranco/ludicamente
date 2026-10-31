import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/carrito",
          "/checkout",
          "/_next/",
          // Evita que Googlebot y otros rastreadores caigan en bucles infinitos
          // rastreando combinaciones de filtros de catálogo (?sort=, ?categoria=, etc.)
          // que saturan la CPU del servidor.
          "/*?*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/carrito",
          "/checkout",
          "/_next/",
          "/*?*",
        ],
      },
    ],
    sitemap: "https://ludicamente.cl/sitemap.xml",
  }
}
