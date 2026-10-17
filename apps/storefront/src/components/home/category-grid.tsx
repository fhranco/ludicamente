import React from "react"
import Link from "next/link"
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
    short: "Para estar juntos",
    filter: "juegos-de-mesa",
    bg: "#e7e0fb",
    art: (
      <svg
        viewBox="0 0 320 280"
        className="max-w-[175px] w-[90%] h-[150px] overflow-visible drop-shadow-[0_11px_6px_#4f36681a] group-hover:scale-105 group-hover:rotate-3 transition-transform"
      >
        <ellipse cx="160" cy="242" rx="118" ry="19" fill="#765a7a" opacity="0.12" />
        <g transform="translate(48 47) rotate(-8 111 94)">
          <rect width="224" height="183" rx="19" fill="#fff2d3" stroke="#dca56d" strokeWidth="10" />
          <rect x="18" y="18" width="188" height="147" rx="10" fill="#e9dcf6" />
          <path d="M30 42h160M30 77h160M30 112h160M30 147h160M62 27v125M100 27v125M139 27v125M178 27v125" stroke="#fff" strokeWidth="7" />
          <rect x="32" y="29" width="27" height="29" rx="5" fill="#f9b366" />
          <rect x="111" y="81" width="24" height="27" rx="5" fill="#f67a6d" />
          <rect x="69" y="118" width="26" height="25" rx="5" fill="#93bfac" />
          <path d="M142 45h26v26h-26Z" fill="#f9d67c" />
        </g>
        <g>
          <path d="M88 216 99 184l11 32Z" fill="#f7756b" />
          <circle cx="99" cy="180" r="9" fill="#f7756b" />
          <path d="M209 218 220 189l11 29Z" fill="#7455a2" />
          <circle cx="220" cy="186" r="8" fill="#7455a2" />
          <rect x="237" y="197" width="37" height="37" rx="7" fill="#fff" stroke="#f4cf89" strokeWidth="3" />
          <circle cx="249" cy="208" r="3" fill="#7455a2" />
          <circle cx="262" cy="221" r="3" fill="#7455a2" />
        </g>
      </svg>
    ),
  },
  {
    id: "arte",
    label: "Arte y creatividad",
    short: "Manos a la obra",
    filter: "arte-y-creatividad",
    bg: "#ffe2d4",
    art: (
      <svg
        viewBox="0 0 320 280"
        className="max-w-[175px] w-[90%] h-[150px] overflow-visible drop-shadow-[0_11px_6px_#4f36681a] group-hover:scale-105 group-hover:rotate-3 transition-transform"
      >
        <ellipse cx="160" cy="243" rx="116" ry="19" fill="#347c64" opacity="0.13" />
        <g transform="translate(57 68) rotate(-9 105 74)">
          <rect width="211" height="152" rx="19" fill="#fffaf0" stroke="#dcb58b" strokeWidth="7" />
          <path d="M25 22h162v43H25Z" fill="#f5d6a4" />
          <circle cx="44" cy="44" r="14" fill="#fa7a68" />
          <circle cx="82" cy="44" r="14" fill="#f9c45e" />
          <circle cx="120" cy="44" r="14" fill="#9bc8a8" />
          <circle cx="157" cy="44" r="14" fill="#8667b7" />
          <path d="M22 81h166v52H22Z" fill="#fff7de" />
          <g stroke="#b2a0a4" strokeWidth="4">
            <path d="M32 98h146M32 118h146" />
          </g>
        </g>
        <g transform="translate(214 30) rotate(25)">
          <rect x="0" y="48" width="20" height="180" rx="7" fill="#b58262" />
          <rect x="0" y="44" width="20" height="37" rx="3" fill="#d9c4a6" />
          <path d="M10 0Q-3 18 0 47h20Q23 20 10 0Z" fill="#7054aa" />
        </g>
        <path d="m53 62 8-19 8 19 18 7-18 8-8 18-8-18-18-8Z" fill="#ffd77a" />
      </svg>
    ),
  },
  {
    id: "didacticos",
    label: "Aprender jugando",
    short: "A descubrir",
    filter: "primera-infancia",
    bg: "#dff3e3",
    art: (
      <svg
        viewBox="0 0 320 280"
        className="max-w-[175px] w-[90%] h-[150px] overflow-visible drop-shadow-[0_11px_6px_#4f36681a] group-hover:scale-105 group-hover:rotate-3 transition-transform"
      >
        <ellipse cx="160" cy="232" rx="112" ry="18" fill="#684d8d" opacity="0.12" />
        <g strokeLinecap="round" fill="none">
          <path d="M55 211V151c0-58 47-105 105-105s105 47 105 105v60" stroke="#7553a4" strokeWidth="29" />
          <path d="M83 211V151c0-43 34-77 77-77s77 34 77 77v60" stroke="#f37d67" strokeWidth="27" />
          <path d="M110 211V151c0-27 23-50 50-50s50 23 50 50v60" stroke="#f4c45d" strokeWidth="25" />
          <path d="M137 211V151c0-13 10-23 23-23s23 10 23 23v60" stroke="#99c9b2" strokeWidth="24" />
        </g>
        <path d="M42 225h237" stroke="#b79a86" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
        <path d="m56 61 7-14 7 14 14 7-14 6-7 15-7-15-14-6Z" fill="#f7c65c" />
      </svg>
    ),
  },
  {
    id: "explorar",
    label: "Exploradores",
    short: "Grandes aventuras",
    filter: "ciencia-y-exploracion",
    bg: "#fff0bb",
    art: (
      <svg
        viewBox="0 0 320 280"
        className="max-w-[175px] w-[90%] h-[150px] overflow-visible drop-shadow-[0_11px_6px_#4f36681a] group-hover:scale-105 group-hover:rotate-3 transition-transform"
      >
        <ellipse cx="160" cy="245" rx="112" ry="18" fill="#9b668e" opacity="0.13" />
        <g transform="translate(76 18)">
          <path d="M83 14c35 33 50 85 50 155l-50 31-50-31c0-70 15-122 50-155Z" fill="#fff7e7" stroke="#7654a0" strokeWidth="7" />
          <path d="M83 14c20 19 31 46 38 75H45c7-29 19-56 38-75Z" fill="#fa806a" />
          <circle cx="83" cy="113" r="25" fill="#ccebe6" stroke="#7654a0" strokeWidth="7" />
          <path d="M34 139 4 175l31 14M132 139l30 36-31 14" fill="#f9c262" stroke="#7654a0" strokeWidth="6" strokeLinejoin="round" />
          <path d="M64 200q0 34 19 59 19-25 19-59Z" fill="#ffcf73" />
          <path d="M76 202q0 17 7 35 7-18 7-35Z" fill="#f47a64" />
        </g>
        <g fill="#ffcf73">
          <path d="m47 90 7-15 7 15 15 6-15 6-7 15-7-15-15-6Z" />
          <path d="m262 132 5-12 5 12 13 5-13 5-5 13-5-13-12-5Z" />
        </g>
        <g fill="#7a5aaf">
          <circle cx="253" cy="65" r="7" />
          <circle cx="34" cy="176" r="5" />
        </g>
      </svg>
    ),
  },
  {
    id: "lectura",
    label: "Historias y libros",
    short: "Para imaginar",
    filter: "material-pedagogico",
    bg: "#ffe3e9",
    art: (
      <svg
        viewBox="0 0 320 280"
        className="max-w-[175px] w-[90%] h-[150px] overflow-visible drop-shadow-[0_11px_6px_#4f36681a] group-hover:scale-105 group-hover:rotate-3 transition-transform"
      >
        <ellipse cx="159" cy="239" rx="118" ry="18" fill="#976f6a" opacity="0.14" />
        <g transform="translate(45 119) rotate(-12 108 52)">
          <rect width="216" height="103" rx="13" fill="#7457a6" />
          <path d="M109 11v84" stroke="#c3acd9" strokeWidth="3" />
          <path d="M22 21h65v61H22Z" fill="#fbcb73" />
          <circle cx="53" cy="46" r="20" fill="#fff4d2" />
          <path d="m51 25 6 17 18 4-14 10 4 17-14-8-13 8 4-17-13-10 18-4Z" fill="#f77c64" />
        </g>
        <g transform="translate(76 32) rotate(9 88 75)">
          <rect width="176" height="151" rx="10" fill="#fff8e5" stroke="#f7bb8d" strokeWidth="8" />
          <rect x="17" y="17" width="142" height="119" rx="4" fill="#d6eddf" />
          <circle cx="85" cy="56" r="28" fill="#facb67" />
          <path d="M36 103c27-36 62-29 95 0" stroke="#785aa4" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M49 120h72" stroke="#f57f68" strokeWidth="8" strokeLinecap="round" />
        </g>
        <path d="m51 52 8-18 8 18 18 7-18 7-8 18-8-18-18-7Z" fill="#f8ca75" />
      </svg>
    ),
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
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.5rem] tracking-[-0.042em] text-[#2d2943] mt-2">
              ¿Qué jugamos <span className="text-[#fa795f]">hoy?</span>
            </h2>
          </div>
          <p className="max-w-md text-[#77727d] text-[0.96rem] font-semibold leading-relaxed">
            Cada pequeño tiene su propio universo. Encuentra un juego que conecte con su curiosidad.
          </p>
        </div>

        {/* Grilla de 5 Categorías */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-4.5">
          {CATEGORY_ITEMS.map((item, idx) => {
            const isLast = idx === CATEGORY_ITEMS.length - 1

            return (
              <Link
                key={item.id}
                href={`/categoria/${item.filter}`}
                style={{ backgroundColor: item.bg }}
                className={`group relative flex flex-col items-center text-center rounded-[29px] min-h-[240px] sm:min-h-[260px] p-5 sm:p-5 pb-6 transition-all duration-300 hover:-translate-y-2 hover:-rotate-1 shadow-[0_10px_25px_rgba(70,47,82,0.06)] hover:shadow-[0_20px_55px_rgba(70,47,82,0.12)] ${
                  isLast ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                {/* Flecha diminuta en esquina */}
                <span className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/70 grid place-items-center text-[#2d2943] group-hover:bg-white group-hover:scale-110 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                {/* Arte Ilustrado */}
                <div className="h-[145px] sm:h-[165px] w-full grid place-items-center">
                  {item.art}
                </div>

                {/* Título y Subtítulo */}
                <h3 className="font-display font-semibold text-lg sm:text-[1.25rem] leading-tight text-[#2d2943] mt-auto">
                  {item.label}
                </h3>
                <small className="font-extrabold text-[0.72rem] text-[#756e7b] mt-1">
                  {item.short}
                </small>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

