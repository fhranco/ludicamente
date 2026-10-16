import React from "react"
import { Metadata } from "next"
import { getProducts, getCategories } from "@/lib/medusa"
import { CatalogView } from "@/components/catalog/catalog-view"

export const metadata: Metadata = {
  title: "Catálogo Completo | Lúdicamente Chile",
  description:
    "Explora nuestro catálogo de juegos de mesa, juguetes didácticos en madera, robótica STEM y puzzles con cotización directa a WhatsApp en CLP.",
}

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([
    getProducts({ limit: 50 }),
    getCategories(),
  ])

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-8">
      {/* Encabezado Editorial de Catálogo */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
          <span className="ml-2">CATÁLOGO EDITORIAL</span>
        </div>
        <h1 className="font-display font-semibold text-3xl sm:text-5xl text-[#2d2943] tracking-[-0.042em]">
          Todos los Juegos y Recursos
        </h1>
        <p className="text-sm sm:text-base text-[#77727d] max-w-2xl font-semibold leading-relaxed">
          Navega por colecciones, filtra por tus preferencias y agrega al carrito cotizador para consultar disponibilidad en pesos chilenos vía WhatsApp.
        </p>
      </div>

      {/* Vista de Catálogo Interactiva */}
      <CatalogView initialProducts={products} categories={categories} />
    </div>
  )
}
