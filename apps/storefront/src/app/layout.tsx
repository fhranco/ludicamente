import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { TopBanner } from "@/components/layout/top-banner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { FloatingWhatsApp } from "@/components/common/floating-whatsapp"

export const metadata: Metadata = {
  title: "Ludicamente ✳ Jugar hace bien | Tienda creativa de juegos y momentos para imaginar",
  description:
    "Ludicamente: concepto original de tienda creativa de juegos, juguetes y momentos para imaginar. Catálogo y cotización asistida en pesos chilenos.",
  keywords: [
    "juegos didacticos punta arenas",
    "material didactico magallanes",
    "juguetes de madera punta arenas",
    "juegos de mesa punta arenas",
    "educacion stem chile",
    "puzzles artisticos",
    "ludicamente punta arenas",
  ],
  authors: [{ name: "Ludicamente" }],
  openGraph: {
    title: "Ludicamente ✳ Jugar hace bien",
    description: "Juegos y pequeños descubrimientos que encienden la imaginación.",
    url: "https://ludicamente.cl",
    siteName: "Ludicamente",
    locale: "es_CL",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CL" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fredoka:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffcf7] text-[#2d2943] font-sans selection:bg-[#ecf19f] selection:text-[#2d2943]">
        <CartProvider>
          <TopBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <FloatingWhatsApp />
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
