import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "@/components/ui/icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Baby01Icon,
  GiftIcon,
  AlarmClockIcon,
  CloudSnowIcon,
} from "@hugeicons/core-free-icons"
import { getProducts, getCategories } from "@/lib/medusa"
import { CatalogView } from "@/components/catalog/catalog-view"

// ISR: La tienda se regenera en segundo plano cada 30 min.
export const revalidate = 1800

export const metadata: Metadata = {
  title: "Tienda Oficial | Juegos Didácticos & Juegos de Mesa en Punta Arenas",
  description:
    "Descubre toda la tienda online de Lúdicamente en Punta Arenas. Juegos de mesa, juguetes didácticos en madera noble, estimulación infantil y puzzles con empaque de regalo y dedicatoria gratis.",
}

export default async function TiendaPage() {
  const [products, categories] = await Promise.all([
    getProducts({ limit: 50 }),
    getCategories(),
  ])

  return (
    <div className="bg-[#fffcf7] min-h-screen pt-4 sm:pt-6 pb-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-5">
        {/* Encabezado Compacto y Elegante */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#f0eae2]">
          <div className="space-y-1">
            <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs font-semibold text-[#8a8190]">
              <Link href="/" className="hover:text-[#4b347d] transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-extrabold text-[#2d2943]">Tienda</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-[#ffece8] text-[#fa795f] grid place-items-center">
                <HugeiconsIcon icon={Baby01Icon} size={22} strokeWidth={1.8} />
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#2d2943] tracking-tight">
                Tienda Lúdicamente
              </h1>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#fa795f]/15 border border-[#fa795f]/30 text-[#e0583d]">
                {products.length} tesoros didácticos
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#706478] font-medium">
              Juegos didácticos en madera, juegos de mesa y estimulación con empaque de regalo y dedicatoria gratis en Punta Arenas
            </p>
          </div>

          {/* Sellos de Confianza Artesanales */}
          <div className="flex items-center gap-2 text-xs font-bold text-[#554760] shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#eedcd0] shadow-xs text-[#e0583d]">
              <HugeiconsIcon icon={GiftIcon} size={15} strokeWidth={2} />
              <span>Moño & tarjeta gratis</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#eedcd0] shadow-xs text-[#2e7d32]">
              <HugeiconsIcon icon={AlarmClockIcon} size={15} strokeWidth={2} />
              <span>Retiro hoy en tienda</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#eedcd0] shadow-xs text-[#4b347d] hidden sm:inline-flex">
              <HugeiconsIcon icon={CloudSnowIcon} size={15} strokeWidth={1.8} />
              <span>Punta Arenas</span>
            </span>
          </div>
        </div>

        {/* Vista Interactiva de Tienda y Filtros Compactos */}
        <CatalogView initialProducts={products} categories={categories} />
      </div>
    </div>
  )
}
