"use client"

import React, { useState, useMemo } from "react"
import { Search, SlidersHorizontal, ArrowUpDown, X, RefreshCw } from "@/components/ui/icons"
import { ProductCard } from "@/components/product/product-card"
import type { MedusaProduct, MedusaProductCategory } from "@/lib/medusa"

interface CatalogViewProps {
  initialProducts: MedusaProduct[]
  categories: MedusaProductCategory[]
  selectedCategoryHandle?: string
}

const AGE_FILTER_OPTIONS = [
  { id: "all", label: "Todas las edades", icon: "✨" },
  { id: "0-2", label: "0 a 2 años", icon: "🍼", desc: "Sensorial y madera" },
  { id: "3-5", label: "3 a 5 años", icon: "🎨", desc: "Creatividad y motricidad" },
  { id: "6-8", label: "6 a 8 años", icon: "🎒", desc: "Juegos de mesa y retos" },
  { id: "9+", label: "9+ años", icon: "♟️", desc: "Estrategia y puzzles" },
]

const BUDGET_FILTER_OPTIONS = [
  { id: "all", label: "Cualquier precio" },
  { id: "15k", label: "Hasta $15.000", max: 15000 },
  { id: "30k", label: "$15.000 a $30.000", min: 15000, max: 30000 },
  { id: "plus", label: "Más de $30.000", min: 30000 },
]

export function CatalogView({
  initialProducts,
  categories,
  selectedCategoryHandle,
}: CatalogViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>(
    selectedCategoryHandle || "all"
  )
  const [activeAge, setActiveAge] = useState<string>("all")
  const [activeBudget, setActiveBudget] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">(
    "featured"
  )

  // Filtrado y ordenamiento dinámico multidimensional
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const variant = product.variants?.[0]
        const price = variant?.calculated_price?.calculated_amount ?? 0

        // 1. Filtro por categoría
        if (activeCategory !== "all") {
          const inCategory = product.categories?.some(
            (c) => c.handle === activeCategory
          )
          if (!inCategory) return false
        }

        // 2. Filtro por presupuesto
        if (activeBudget === "15k" && (price <= 0 || price > 15000)) return false
        if (activeBudget === "30k" && (price < 15000 || price > 30000)) return false
        if (activeBudget === "plus" && price < 30000) return false

        // 3. Filtro por edad según títulos, tags y categorías
        if (activeAge !== "all") {
          const text = `${product.title} ${product.subtitle || ""} ${product.description || ""} ${product.tags?.map((t) => t.value).join(" ") || ""} ${product.categories?.map((c) => `${c.name} ${c.handle}`).join(" ") || ""}`.toLowerCase()

          if (activeAge === "0-2") {
            const match = text.includes("primera-infancia") || text.includes("sensorial") || text.includes("madera") || text.includes("bebé") || text.includes("bebe") || text.includes("gateo") || text.includes("0 a 2") || text.includes("0-2") || text.includes("1 año") || text.includes("2 años")
            if (!match) return false
          } else if (activeAge === "3-5") {
            const match = text.includes("arte") || text.includes("creatividad") || text.includes("motricidad") || text.includes("bloques") || text.includes("puzzle") || text.includes("3 a 5") || text.includes("3-5") || text.includes("3+") || text.includes("4+") || text.includes("5+") || text.includes("preescolar")
            if (!match) return false
          } else if (activeAge === "6-8") {
            const match = text.includes("mesa") || text.includes("tablero") || text.includes("cartas") || text.includes("familia") || text.includes("amigos") || text.includes("desafio") || text.includes("ingenio") || text.includes("6 a 8") || text.includes("6-8") || text.includes("6+") || text.includes("7+") || text.includes("8+")
            if (!match) return false
          } else if (activeAge === "9+") {
            const match = text.includes("estrategia") || text.includes("catan") || text.includes("complejo") || text.includes("ciencia") || text.includes("stem") || text.includes("9+") || text.includes("10+") || text.includes("12+")
            if (!match) return false
          }
        }

        // 4. Filtro por búsqueda textual
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase().trim()
          const matchTitle = product.title.toLowerCase().includes(query)
          const matchDesc = product.description?.toLowerCase().includes(query)
          const matchSub = product.subtitle?.toLowerCase().includes(query)
          const matchTags = product.tags?.some((t) => t.value.toLowerCase().includes(query))
          if (!matchTitle && !matchDesc && !matchSub && !matchTags) return false
        }

        return true
      })
      .sort((a, b) => {
        const priceA = a.variants?.[0]?.calculated_price?.calculated_amount ?? 0
        const priceB = b.variants?.[0]?.calculated_price?.calculated_amount ?? 0

        if (sortBy === "price-asc") return priceA - priceB
        if (sortBy === "price-desc") return priceB - priceA
        if (sortBy === "name") return a.title.localeCompare(b.title)
        return 0 // featured
      })
  }, [initialProducts, activeCategory, activeAge, activeBudget, searchTerm, sortBy])

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeAge !== "all" ||
    activeBudget !== "all" ||
    searchTerm.trim() !== "" ||
    sortBy !== "featured"

  const clearAllFilters = () => {
    setSearchTerm("")
    setActiveCategory("all")
    setActiveAge("all")
    setActiveBudget("all")
    setSortBy("featured")
  }

  return (
    <div className="space-y-6">
      {/* =====================================================================
          VITRINA Y MOSTRADOR LÚDICO DE FILTROS ARTESANALES
         ===================================================================== */}
      <div className="bg-gradient-to-b from-[#fffcf8] to-[#fff8f0] border-2 border-[#eedcd0] rounded-3xl p-4 sm:p-5 shadow-[0_6px_25px_rgba(75,40,90,0.04)] space-y-4">
        {/* Fila 1: Buscador Juguetón + Ordenar con Sticker */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* Input de Búsqueda estilo Libreta de Juegos */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base select-none pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="¿Qué juego buscas hoy? (ej. ajedrez, madera, cartas, ciencia...)"
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl border-2 border-[#e6d8cb] bg-white text-xs sm:text-sm font-bold text-[#2d2943] placeholder:text-[#a094a6] placeholder:font-normal focus:outline-none focus:border-[#fa795f] focus:ring-4 focus:ring-[#fa795f]/15 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#f0e4d8] hover:bg-[#fa795f] text-[#706478] hover:text-white flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Ordenar estilo Sticker de Tienda */}
          <div className="flex items-center gap-1.5 shrink-0 bg-white border-2 border-[#e6d8cb] px-3.5 py-2 rounded-2xl shadow-xs">
            <span className="text-sm">🔃</span>
            <span className="text-[11px] font-bold text-[#8a7e91] hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs font-black text-[#4b347d] bg-transparent focus:outline-none cursor-pointer pr-1"
              aria-label="Ordenar productos"
            >
              <option value="featured">✨ Destacados Lúdicamente</option>
              <option value="price-asc">🪙 Menor precio primero</option>
              <option value="price-desc">👑 Mayor precio primero</option>
              <option value="name">🔤 Nombre (A - Z)</option>
            </select>
          </div>

          {/* Botón Reset si hay filtros aplicados */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#fa795f]/15 hover:bg-[#fa795f] text-[#d44d33] hover:text-white text-xs font-black transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0"
            >
              <span>🧹</span>
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Fila 2: Estante de Edades (Píldoras Ilustradas Grandes y Táctiles) */}
        <div className="space-y-1.5 pt-1 border-t border-[#f2e6dc]">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#fa795f]">
            <span>🎂</span>
            <span>Por Edad Recomendada:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
            {AGE_FILTER_OPTIONS.map((opt) => {
              const isSelected = activeAge === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveAge(opt.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    isSelected
                      ? "bg-[#fa795f] text-white shadow-[0_4px_12px_rgba(250,121,95,0.35)] scale-105 -translate-y-0.5"
                      : "bg-white border-2 border-[#eddcd0] text-[#554760] hover:border-[#fa795f] hover:bg-[#fff7f4]"
                  }`}
                >
                  <span className="text-sm">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Fila 3: Estante de Colecciones (Etiquetas de Juguetería) */}
        <div className="space-y-1.5 pt-1 border-t border-[#f2e6dc]">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#4b347d]">
            <span>🏷️</span>
            <span>Colección de Juguetes:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
            <button
              onClick={() => setActiveCategory("all")}
              type="button"
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                activeCategory === "all"
                  ? "bg-[#4b347d] text-white shadow-[0_4px_12px_rgba(75,52,125,0.3)] scale-105 -translate-y-0.5"
                  : "bg-white border-2 border-[#eddcd0] text-[#554760] hover:border-[#4b347d] hover:bg-[#f6f2fc]"
              }`}
            >
              <span>🧸 Todas</span> ({initialProducts.length})
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
                  className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                    activeCategory === cat.handle
                      ? "bg-[#4b347d] text-white shadow-[0_4px_12px_rgba(75,52,125,0.3)] scale-105 -translate-y-0.5"
                      : "bg-white border-2 border-[#eddcd0] text-[#554760] hover:border-[#4b347d] hover:bg-[#f6f2fc]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="opacity-70 text-[10px] ml-1">({count})</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Fila 4: Píldoras de Presupuesto (Cofrecitos de Ahorro) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#f2e6dc]">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#e8932b] flex items-center gap-1 shrink-0 mr-1">
            <span>💰</span> Presupuesto:
          </span>
          {BUDGET_FILTER_OPTIONS.map((b) => {
            const isSelected = activeBudget === b.id
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBudget(b.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#e8932b] text-white shadow-xs font-extrabold scale-105"
                    : "bg-white/80 border border-[#e8d5bf] text-[#705228] hover:bg-[#fef7ed]"
                }`}
              >
                {b.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* =====================================================================
          CONTADOR Y RESULTADOS DE LA TIENDA
         ===================================================================== */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-extrabold text-[#706478]">
          Mostrando <strong className="text-[#2d2943] text-sm">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "juego" : "juegos"}
        </div>
        <div className="text-[11px] font-bold text-[#349673] bg-[#dcf3e5] px-2.5 py-0.5 rounded-full border border-[#bee7ce]">
          📍 Stock en Punta Arenas
        </div>
      </div>

      {/* Grilla de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      ) : (
        /* Estado Vacío Amigable */
        <div className="bg-[#fffbf6] border-2 border-dashed border-[#e7dbd2] rounded-[32px] p-10 sm:p-14 text-center max-w-lg mx-auto space-y-4 my-8">
          <span className="text-5xl select-none">🧩</span>
          <strong className="block font-display font-semibold text-2xl text-[#2d2943]">
            No encontramos juegos con esos filtros exactos
          </strong>
          <p className="text-xs sm:text-sm text-[#77727d] font-semibold max-w-sm mx-auto leading-relaxed">
            Prueba cambiando la edad, el presupuesto o limpiando los filtros para ver todos nuestros tesoros didácticos disponibles.
          </p>
          <button
            onClick={clearAllFilters}
            type="button"
            className="inline-flex items-center gap-2 bg-[#fa795f] hover:bg-[#e7694f] text-white px-6 py-3 rounded-full text-xs font-extrabold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Ver todo el catálogo</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  )
}
