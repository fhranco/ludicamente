import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lúdicamente | Jugar hace bien",
    short_name: "Lúdicamente",
    description:
      "Tienda creativa de juegos de mesa, juguetes didácticos y momentos para imaginar en Punta Arenas y todo Chile.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffcf7",
    theme_color: "#4b347d",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}

