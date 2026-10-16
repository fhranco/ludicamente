"use client"

import React, { useState, useMemo } from "react"
import { Search, SlidersHorizontal, ArrowUpDown, X, BookOpen } from "@/components/ui/icons"
import { ProductCard } from "@/components/product/product-card"
import type { MedusaProduct, MedusaProductCategory } from "@/lib/medusa"

interface CatalogViewProps {
  initialProducts: MedusaProduct[]
  categories: MedusaProductCategory[]
  selectedCategoryHandle?: string
}

export function CatalogView({
  initialProducts,
  categories,
  selectedCategoryHandle,
}: CatalogViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>(
    selectedCategoryHandle || "all"
  )
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">(
    "featured"
  )

  // Filtrado y ordenamiento dinámico
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Filtro por categoría
        if (activeCategory !== "all") {
          const inCategory = product.categories?.some(
            (c) => c.handle === activeCategory
          )
          if (!inCategory) return false
        }

        // Filtro por búsqueda
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase().trim()
          const matchTitle = product.title.toLowerCase().includes(query)
          const matchDesc = product.description?.toLowerCase().includes(query)
          const matchSub = product.subtitle?.toLowerCase().includes(query)
          if (!matchTitle && !matchDesc && !matchSub) return false
        }

        return true
      })
      .sort((a, b) => {
        const priceA = a.variants?.[0]?.calculated_price?.calculated_amount ?? 0
        const priceB = b.variants?.[0]?.calculated_price?.calculated_amount ?? 0

        if (sortBy === "price-asc") return priceA - priceB
        if (sortBy === "price-desc") return priceB - priceA
        if (sortBy === "name") return a.title.localeCompare(b.title)
        return 0 // featured / orden original
      })
  }, [initialProducts, activeCategory, searchTerm, sortBy])

  const clearFilters = () => {
    setSearchTerm("")
    setActiveCategory("all")
    setSortBy("featured")
  }

  return (
    <div className="space-y-8">
      {/* Barra de Filtros, Búsqueda y Orden */}
      <div className="bg-white border border-[#efeae5] rounded-[26px] p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Input de Búsqueda */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8190]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por juego, habilidad, temática o edad..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#e8e0de] bg-[#fffaf1]/50 text-sm font-semibold text-[#2d2943] placeholder:text-[#8a8190] focus:outline-none focus:border-[#4b347d] focus:ring-2 focus:ring-[#4b347d]/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a8190] hover:text-[#2d2943]"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Selector de Orden */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <ArrowUpDown className="w-4 h-4 text-[#8a8190] hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full md:w-auto px-4 py-2.5 rounded-full border border-[#e8e0de] bg-[#fffaf1]/50 text-xs font-bold text-[#2d2943] focus:outline-none focus:border-[#4b347d] transition-all cursor-pointer"
              aria-label="Ordenar productos"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name">Alfabético (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Chips de Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <button
            onClick={() => setActiveCategory("all")}
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
              activeCategory === "all"
                ? "bg-[#4b347d] text-white shadow-sm"
                : "bg-white border border-[#e8e0de] text-[#7b7180] hover:border-[#4b347d] hover:text-[#4b347d]"
            }`}
          >
            Todas las Colecciones ({initialProducts.length})
          </button>

          {categories.map((cat) => {
            const count = initialProducts.filter((p) =>
              p.categories?.some((c) => c.handle === cat.handle)
            ).length

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.handle)}
                type="button"
                className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                  activeCategory === cat.handle
                    ? "bg-[#4b347d] text-white shadow-sm"
                    : "bg-white border border-[#e8e0de] text-[#7b7180] hover:border-[#4b347d] hover:text-[#4b347d]"
                }`}
              >
                {cat.name} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Resultados de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      ) : (
        /* Estado Vacío Amigable */
        <div className="bg-[#fffaf1] border-2 border-dashed border-[#e7dbd2] rounded-[25px] p-12 text-center max-w-lg mx-auto space-y-4 my-12">
          <strong className="block font-display font-semibold text-2xl text-[#2d2943]">
            No encontramos productos coincidentes ☁
          </strong>
          <p className="text-xs text-[#77727d] font-semibold max-w-sm mx-auto">
            Prueba cambiando los términos de búsqueda o seleccionando otra colección de juegos.
          </p>
          <button
            onClick={clearFilters}
            type="button"
            className="inline-flex items-center gap-2 bg-[#4b347d] hover:bg-[#392559] text-white px-6 py-2.5 rounded-full text-xs font-extrabold transition-all shadow-sm"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}
    </div>
  )
}
