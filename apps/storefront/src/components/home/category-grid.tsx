import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "@/components/ui/icons"
import type { MedusaProductCategory } from "@/lib/medusa"

interface CategoryGridProps {
  categories?: MedusaProductCategory[]
  onSelectCategory?: (category: string) => void
}

const CATEGORY_ITEMS = [
  {
    id: "mesa",
    label: "Juegos de mesa",
    subtitle: "Para toda la familia",
    filter: "juegos-de-mesa",
    bg: "#EEE4FF",
    image: "/home/categories/categoria-juegos-de-mesa.webp",
    alt: "Juegos de mesa familiares y de estrategia",
  },
  {
    id: "arte",
    label: "Arte y creatividad",
    subtitle: "Imagina y crea",
    filter: "arte-y-creatividad",
    bg: "#FFE2D4",
    image: "/home/categories/categoria-arte-creatividad.webp",
    alt: "Materiales de arte, dibujo y pintura creativa infantil",
  },
  {
    id: "didacticos",
    label: "Aprender jugando",
    subtitle: "Descubre el mundo",
    filter: "primera-infancia",
    bg: "#DDF6E6",
    image: "/home/categories/categoria-aprender-jugando.webp",
    alt: "Juguetes didácticos de estimulación temprana",
  },
  {
    id: "explorar",
    label: "Exploradores",
    subtitle: "Ciencia, naturaleza y más",
    filter: "ciencia-y-exploracion",
    bg: "#FFF0BB",
    image: "/home/categories/categoria-exploradores.webp",
    alt: "Kits de ciencia, cohetes y exploración de la naturaleza",
    isCompact: true,
  },
  {
    id: "lectura",
    label: "Historias y libros",
    subtitle: "Para soñar",
    filter: "material-pedagogico",
    bg: "#FCE4EC",
    image: "/home/categories/categoria-historias-libros.webp",
    alt: "Cuentos infantiles, libros didácticos e historias para imaginar",
  },
]

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 sm:py-24 bg-[#fffcf7]" id="categorias">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
              <span className="ml-2">UNA IDEA PARA CADA AVENTURA</span>
            </div>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.5rem] tracking-[-0.042em] text-[#2d2943] mt-2 relative inline-flex items-center gap-2">
              <span>¿Qué jugamos <span className="text-[#fa795f]">hoy?</span></span>
              <span className="hidden sm:inline-block w-8 h-8 text-[#fa795f]" aria-hidden="true">
                <Image
                  src="/home/decorations/destello-coral.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="w-full h-auto"
                />
              </span>
            </h2>
          </div>
          <p className="max-w-md text-[#77727d] text-[0.96rem] font-semibold leading-relaxed">
            Descubre nuestra selección por tipo de juego. Cada categoría es una nueva aventura.
          </p>
        </div>

        {/* Grilla de 5 Categorías Pastel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-4.5">
          {CATEGORY_ITEMS.map((item, idx) => {
            const isLast = idx === CATEGORY_ITEMS.length - 1

            return (
              <Link
                key={item.id}
                href={`/categoria/${item.filter}`}
                style={{ backgroundColor: item.bg }}
                className={`group relative flex flex-col justify-between rounded-[26px] min-h-[260px] sm:min-h-[285px] p-4.5 sm:p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_35px_rgba(70,47,82,0.1)] border border-black/[0.03] ${
                  isLast ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                {/* Imagen Fotográfica de Categoría */}
                <div className="h-[140px] sm:h-[155px] w-full flex items-center justify-center p-2 overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={item.isCompact ? 164 : 280}
                      height={item.isCompact ? 150 : 191}
                      className="max-h-full w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                </div>

                {/* Pie de la Tarjeta con Título, Subtítulo y Botón Circular */}
                <div className="pt-2 flex items-end justify-between gap-2 mt-auto">
                  <div>
                    <h3 className="font-display font-semibold text-base sm:text-[1.12rem] leading-snug text-[#2d2943]">
                      {item.label}
                    </h3>
                    <p className="text-[0.72rem] sm:text-[0.76rem] font-semibold text-[#6d6474] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <span className="w-8 h-8 rounded-full bg-white text-[#fa795f] group-hover:bg-[#fa795f] group-hover:text-white grid place-items-center shadow-sm shrink-0 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
