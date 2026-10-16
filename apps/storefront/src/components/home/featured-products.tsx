"use client"

import React, { useState } from "react"
import { ProductCard } from "@/components/product/product-card"
import { ArrowRight } from "@/components/ui/icons"
import type { MedusaProduct, MedusaProductCategory } from "@/lib/medusa"

interface FeaturedProductsProps {
  products: MedusaProduct[]
  categories: MedusaProductCategory[]
  activeAgeFilter?: number | null
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
  activeAgeFilter = null,
}: FeaturedProductsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  // Filtro combinado de categoría
  const filteredProducts = products.filter((p) => {
    if (selectedFilter === "all") return true
    return p.categories?.some((c) => c.handle === selectedFilter)
  })

  return (
    <section className="relative py-20 sm:py-24 bg-white overflow-hidden" id="favoritos">
      {/* Marca de agua ✳ decorativa en esquina superior */}
      <div
        className="absolute top-4 right-[5%] text-[140px] sm:text-[180px] font-display text-[#f5f0e8] leading-none select-none pointer-events-none -z-0"
        aria-hidden="true"
      >
        ✳
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10" id="catalogo">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
              <span className="ml-2">NUESTROS ELEGIDOS</span>
            </div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[3.8rem] leading-[1.07] tracking-[-0.042em] text-[#2d2943] mt-2">
              Pequeños juegos.
              <br />
              <span className="text-[#fa795f]">Grandes historias.</span>
            </h2>
          </div>

          <a
            href="#edades"
            className="inline-flex items-center gap-2 text-[#4b347d] font-extrabold text-[0.91rem] border-b-2 border-[#4b347d] pb-1 hover:text-[#fa795f] hover:border-[#fa795f] transition-colors whitespace-nowrap self-start sm:self-end"
          >
            <span>Buscar por edad</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Barra de Filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CONCEPT_FILTERS.map((f) => {
              const isActive = selectedFilter === f.filter
              return (
                <button
                  key={f.filter}
                  onClick={() => setSelectedFilter(f.filter)}
                  type="button"
                  className={`px-4 py-2.5 rounded-full text-[0.82rem] font-extrabold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#4b347d] text-white shadow-sm"
                      : "bg-white text-[#7b7180] border-[1.5px] border-[#e8e0de] hover:border-[#4b347d] hover:text-[#4b347d]"
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          <span className="text-[0.76rem] font-extrabold text-[#8b8390] whitespace-nowrap">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "juego disponible" : "juegos disponibles"}
          </span>
        </div>

        {/* Grilla 4 Columnas */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-[#fffaf1] border-2 border-dashed border-[#e7dbd2] rounded-[25px] p-12 text-center max-w-lg mx-auto my-6">
            <strong className="block font-display font-semibold text-2xl text-[#2d2943] mb-2">
              Por aquí no hay juegos todavía ☁
            </strong>
            <p className="text-[#77727d] text-sm font-semibold mb-5">
              Prueba con otra categoría o restablece el filtro.
            </p>
            <button
              onClick={() => setSelectedFilter("all")}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-[1.5px] border-[#4b347d] text-[#4b347d] text-xs font-extrabold hover:bg-[#4b347d] hover:text-white transition-all"
            >
              Ver todos los juegos
            </button>
          </div>
        )}

        {/* Pie de Productos */}
        <div className="text-center mt-12">
          <button
            onClick={() => setSelectedFilter("all")}
            type="button"
            className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#4b347d] text-[#4b347d] hover:text-white border-[1.5px] border-[#4b347d] px-7 py-3.5 rounded-full font-extrabold text-[0.93rem] hover:-translate-y-0.5 transition-all"
          >
            <span>Ver todos los juegos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
