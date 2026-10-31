"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/product/product-card"
import { ArrowRight } from "@/components/ui/icons"
import type { MedusaProduct, MedusaProductCategory } from "@/lib/medusa"

interface FeaturedProductsProps {
  products: MedusaProduct[]
  categories?: MedusaProductCategory[]
}

const CONCEPT_FILTERS = [
  { label: "Todos", filter: "all" },
  { label: "Mesa", filter: "juegos-de-mesa" },
  { label: "Arte", filter: "arte-y-creatividad" },
  { label: "Didácticos", filter: "primera-infancia" },
  { label: "Explorar", filter: "ciencia-y-exploracion" },
  { label: "Lectura", filter: "material-pedagogico" },
]

export function FeaturedProducts({
  products,
  categories,
}: FeaturedProductsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  // Filtro combinado de categoría
  const filteredProducts = products.filter((p) => {
    if (selectedFilter === "all") return true
    return p.categories?.some((c) => c.handle === selectedFilter)
  })

  // Para la home mostramos los 4 o 8 principales seleccionados
  const displayProducts = filteredProducts.slice(0, 8)

  return (
    <section className="relative py-20 sm:py-24 bg-white overflow-hidden" id="recomendados">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Encabezado según Propuesta Visual Aprobada */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff4ea] border border-[#f0dac7] text-[#fa795f] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase mb-2">
              <span>✦</span>
              <span>ESTO TAMBIÉN TE PUEDE ENCANTAR</span>
              <span>✦</span>
            </div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[3.2rem] tracking-[-0.04em] text-[#2d2943]">
              Productos recomendados
            </h2>
            <p className="text-[#6d6475] text-sm sm:text-base font-semibold mt-1">
              Juguetes que inspiran y acompañan cada etapa.
            </p>
          </div>

          <Link
            href="/tienda"
            className="inline-flex items-center justify-center gap-2.5 bg-[#39265B] hover:bg-[#2d1e48] text-white px-6 py-3.5 rounded-full font-extrabold text-[0.92rem] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all self-start sm:self-end whitespace-nowrap"
          >
            <span>Ver toda la tienda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Barra de Filtros Rápidos */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {CONCEPT_FILTERS.map((f) => {
            const isActive = selectedFilter === f.filter
            return (
              <button
                key={f.filter}
                onClick={() => setSelectedFilter(f.filter)}
                type="button"
                className={`px-4 py-2 rounded-full text-[0.82rem] font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#fa795f] text-white shadow-sm"
                    : "bg-[#fffcf7] text-[#6d6475] border border-[#e8d7c8] hover:border-[#fa795f] hover:text-[#fa795f]"
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Grilla de 4 Columnas */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {displayProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-[#fffaf1] border-2 border-dashed border-[#e7dbd2] rounded-[25px] p-10 text-center max-w-lg mx-auto my-6">
            <strong className="block font-display font-semibold text-xl text-[#2d2943] mb-2">
              No hay productos con este filtro
            </strong>
            <button
              onClick={() => setSelectedFilter("all")}
              type="button"
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fa795f] text-white text-xs font-extrabold hover:bg-[#ea684e] transition-all cursor-pointer"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
