"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, ArrowRight } from "@/components/ui/icons"
import { formatCLP } from "@/lib/format-price"

interface SearchProductItem {
  id: string
  title: string
  handle: string
  subtitle?: string
  priceCLP: number
  category?: string
  thumbnail?: string
  bg?: string
}

// Catálogo base de sugerencias y búsqueda instantánea
const QUICK_ITEMS: SearchProductItem[] = [
  {
    id: "prod-1",
    title: "Torre de Equilibrio Botánico",
    handle: "torre-de-equilibrio-botanico",
    subtitle: "Madera maciza sustentable y motricidad fina",
    priceCLP: 18990,
    category: "Didácticos",
    bg: "#f3e9ff",
  },
  {
    id: "prod-2",
    title: "Acuarelas Botánicas Naturales",
    handle: "acuarelas-botanicas-naturales",
    subtitle: "Pigmentos minerales seguros para pintar con libertad",
    priceCLP: 14500,
    category: "Arte",
    bg: "#ffdfcf",
  },
  {
    id: "prod-3",
    title: "Expedición Galáctica: El Juego",
    handle: "expedicion-galactica-el-juego",
    subtitle: "Estrategia cooperativa para toda la familia",
    priceCLP: 24990,
    category: "Mesa",
    bg: "#e4f7ff",
  },
  {
    id: "prod-4",
    title: "Arcoíris Waldorf Sensorial",
    handle: "arcoiris-waldorf-sensorial",
    subtitle: "12 arcos de encastre libre y texturas nobles",
    priceCLP: 29990,
    category: "Didácticos",
    bg: "#fbf2d3",
  },
  {
    id: "prod-5",
    title: "Bitácora del Pequeño Astrónomo",
    handle: "bitacora-del-pequeno-astronomo",
    subtitle: "Libro interactivo con mapa estelar y linterna",
    priceCLP: 12990,
    category: "Lectura",
    bg: "#e7f8e8",
  },
  {
    id: "prod-6",
    title: "Kit de Ciencias del Jardín",
    handle: "kit-de-ciencias-del-jardin",
    subtitle: "Lupa de madera, pinzas y guía de flora nativa",
    priceCLP: 19990,
    category: "Explorar",
    bg: "#faeee7",
  },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setQuery("")
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = QUICK_ITEMS.filter((item) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    )
  })

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#231b39]/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click listener */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar juegos y materiales"
        className="relative z-10 w-full max-w-2xl bg-[#fffcf7] rounded-[30px] border border-[#efeae5] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        {/* Cabecera del buscador */}
        <div className="flex items-center justify-between pb-4 border-b border-[#efeae5]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fa795f]" />
            <h2 className="font-display font-semibold text-xl sm:text-2xl text-[#4b347d] tracking-[-0.03em]">
              ¿Qué te gustaría encontrar? ✳
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-[#f3edfb] hover:bg-[#e9defc] text-[#4b347d] grid place-items-center transition-colors"
            aria-label="Cerrar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input de búsqueda estilizado */}
        <div className="mt-5 relative">
          <div className="flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-[#e8e0eb] focus-within:border-[#4b347d] rounded-2xl transition-all shadow-inner">
            <Search className="w-5 h-5 text-[#8a8190] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca juegos de mesa, arte, puzzles de madera..."
              className="w-full bg-transparent border-none text-[#2d2943] font-semibold text-sm sm:text-base placeholder:text-[#95899a] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[#95899a] hover:text-[#2d2943]"
                aria-label="Borrar texto"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sugerencias rápidas */}
        <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-extrabold uppercase text-[#95899a] mr-1">
            Populares:
          </span>
          {[
            { label: "Mesa", q: "Mesa" },
            { label: "Arte", q: "Arte" },
            { label: "Madera", q: "Madera" },
            { label: "Didácticos", q: "Didácticos" },
            { label: "Explorar", q: "Explorar" },
          ].map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => setQuery(tag.q)}
              className="px-3 py-1 rounded-full text-xs font-bold bg-[#f3edfb] hover:bg-[#4b347d] hover:text-white text-[#4b347d] transition-all"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Lista de resultados */}
        <div className="mt-5 space-y-2 max-h-[340px] overflow-y-auto pr-1">
          <div className="text-xs font-extrabold text-[#95899a] uppercase tracking-wider mb-2">
            {query.trim()
              ? `Resultados para "${query}" (${filtered.length})`
              : "Juegos recomendados para empezar"}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-2">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  href={`/producto/${item.handle}`}
                  onClick={onClose}
                  className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-[#f3edfb] transition-all group border border-transparent hover:border-[#e9defc]"
                >
                  <div
                    className="w-12 h-12 rounded-xl shrink-0 grid place-items-center text-xl shadow-xs"
                    style={{ backgroundColor: item.bg || "#f3e9ff" }}
                  >
                    🎲
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm sm:text-base text-[#2d2943] group-hover:text-[#4b347d] truncate transition-colors">
                        {item.title}
                      </span>
                      {item.category && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ecf19f] text-[#4b347d] shrink-0">
                          {item.category}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="text-xs text-[#8a8190] font-medium truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display font-bold text-sm text-[#4b347d]">
                      {formatCLP(item.priceCLP)}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8a8190] group-hover:text-[#fa795f] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center space-y-2">
              <span className="text-3xl block">☁</span>
              <p className="font-display font-semibold text-base text-[#2d2943]">
                No encontramos coincidencias para &quot;{query}&quot;
              </p>
              <p className="text-xs text-[#8a8190] font-medium">
                Prueba buscando por categoría como &quot;Arte&quot;, &quot;Mesa&quot; o &quot;Didácticos&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Footer del Modal */}
        <div className="mt-5 pt-4 border-t border-[#efeae5] flex items-center justify-between text-xs text-[#8a8190] font-semibold">
          <span>Presiona <kbd className="px-1.5 py-0.5 rounded bg-[#f3edfb] text-[#4b347d] font-mono text-[10px]">ESC</kbd> para salir</span>
          <Link
            href="/catalogo"
            onClick={onClose}
            className="text-[#4b347d] hover:text-[#fa795f] font-bold inline-flex items-center gap-1 transition-colors"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
