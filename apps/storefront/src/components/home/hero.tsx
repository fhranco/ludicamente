import React from "react"
import Link from "next/link"
import { ArrowRight } from "@/components/ui/icons"
import { StoreSettings } from "@/lib/medusa"

interface HeroProps {
  settings?: StoreSettings
}

export function Hero({ settings }: HeroProps) {
  const customTitle = settings?.hero_title
  const customSubtitle = settings?.hero_subtitle

  return (
    <section className="relative overflow-hidden bg-[#fff4e7] rounded-b-[36px] sm:rounded-b-[48px] isolate">
      {/* Fondo con matriz de puntos sutil */}
      <div
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#e7d6c5 1.3px, transparent 1.3px)",
          backgroundSize: "25px 25px",
          maskImage: "linear-gradient(to right, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.04fr_1fr] items-center gap-8 lg:gap-3 min-h-[560px] lg:min-h-[635px]">
          {/* Columna de Texto */}
          <div className="relative z-10 py-6 sm:py-8 space-y-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 border border-[#ecdcc8] text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
              <span>TIEMPO DE JUGAR, TIEMPO DE CRECER</span>
            </div>

            {/* H1 Principal */}
            <h1 className="font-display font-semibold text-[3.2rem] sm:text-[4.6rem] lg:text-[5.5rem] xl:text-[6.2rem] leading-[0.98] tracking-[-0.065em] text-[#2d2943] max-w-[690px] mx-auto lg:mx-0">
              {customTitle ? (
                customTitle
              ) : (
                <>
                  Un mundo más bonito empieza al{" "}
                  <span className="text-[#fa795f] relative inline-block whitespace-nowrap">
                    jugar.
                    <svg
                      className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-[14px] sm:h-[18px] text-[#ffd678] -z-10 pointer-events-none"
                      viewBox="0 0 285 18"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 12C68 2 166 2 283 9"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </>
              )}
            </h1>

            {/* Descripción */}
            <p className="text-base sm:text-lg text-[#746b73] leading-relaxed max-w-[475px] font-semibold mx-auto lg:mx-0">
              {customSubtitle ||
                "Juegos y pequeños descubrimientos que encienden la imaginación, despiertan la curiosidad y convierten cualquier día en una aventura."}
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <a
                href="#favoritos"
                className="inline-flex items-center justify-center gap-2.5 bg-[#4b347d] hover:bg-[#392559] text-white px-7 py-3.5 sm:py-4 rounded-full font-extrabold text-[0.93rem] shadow-[0_7px_0_#3925591a] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Descubrir juguetes</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#categorias"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/60 text-[#4b347d] border-[1.5px] border-[#4b347d] px-6 py-3.5 sm:py-4 rounded-full font-extrabold text-[0.93rem] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Explorar categorías</span>
              </a>
            </div>

            {/* Foot con caritas sonrientes */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-3 text-[#827781] text-[0.78rem] font-bold">
              <div className="flex items-center -space-x-2" aria-hidden="true">
                <span className="w-8 h-8 rounded-full bg-[#d8f2df] border-2 border-[#fff4e7] grid place-items-center text-sm font-bold text-[#4b347d]">
                  ✷
                </span>
                <span className="w-8 h-8 rounded-full bg-[#ffe2e2] border-2 border-[#fff4e7] grid place-items-center text-sm font-bold text-[#fa795f]">
                  ♡
                </span>
                <span className="w-8 h-8 rounded-full bg-[#ffd678] border-2 border-[#fff4e7] grid place-items-center text-sm font-bold text-[#4b347d]">
                  ☻
                </span>
              </div>
              <span>Más juego libre. Más tiempo juntos.</span>
            </div>
          </div>

          {/* Columna Visual / Ilustración Original */}
          <div
            className="relative h-[420px] sm:h-[520px] lg:h-[565px] grid place-items-center isolate select-none"
            aria-label="Ilustración de juguetes creativos de colores pastel"
          >
            {/* Mancha de fondo lavanda orgánica */}
            <div
              className="absolute w-[92%] h-[92%] bg-[#e8dcff] top-[4%] -right-[2%] -rotate-[11deg] -z-10 rounded-[44%_56%_63%_37%_/_51%_41%_59%_49%]"
              aria-hidden="true"
            />

            {/* Estrella grande superior */}
            <span
              className="absolute z-10 top-[12%] right-[8%] text-[#fa795f] font-display text-5xl sm:text-6xl rotate-[18deg]"
              aria-hidden="true"
            >
              ✳
            </span>

            {/* Nota Flotante */}
            <div className="absolute top-[8%] left-[-2%] sm:left-[-4%] bg-white border-2 border-[#4b347d] rounded-[18px_18px_18px_4px] px-4 py-3 -rotate-[9deg] shadow-[6px_7px_0_#dbc8eb] font-display font-semibold text-base sm:text-[1.17rem] leading-tight z-20">
              ¡Hola, <span className="text-[#fa795f]">imaginación!</span> ✨
            </div>

            {/* Ilustración Vectorial Principal */}
            <svg
              className="w-full max-w-[580px] h-auto relative z-10 overflow-visible drop-shadow-[0_27px_24px_rgba(73,52,108,0.18)]"
              viewBox="0 0 610 550"
              role="img"
              aria-label="Arcoíris de madera, bloques, cartas y dados ilustrados"
            >
              <defs>
                <filter id="heroShadow" x="-40%" y="-40%" width="190%" height="190%">
                  <feDropShadow dx="3" dy="14" stdDeviation="10" floodColor="#43355b" floodOpacity="0.2" />
                </filter>
                <linearGradient id="woody" x1="0" y1="0" x2="0.8" y2="1">
                  <stop stopColor="#ffe4ab" />
                  <stop offset="1" stopColor="#efb86a" />
                </linearGradient>
              </defs>

              <ellipse cx="317" cy="472" rx="240" ry="42" fill="#77629a" opacity="0.14" />

              {/* Arcoíris de madera en marco */}
              <g transform="translate(168 170) rotate(-14 115 125)" filter="url(#heroShadow)">
                <rect x="15" y="18" width="245" height="290" rx="20" fill="#fffaf0" stroke="#fffcf8" strokeWidth="10" />
                <rect x="33" y="35" width="211" height="249" rx="12" fill="#ffd67b" />
                <circle cx="139" cy="119" r="66" fill="#ffc18a" />
                <path d="M77 180c-7-66 26-118 67-118s70 41 67 118" stroke="#633f92" strokeWidth="21" fill="none" strokeLinecap="round" />
                <path d="M98 182c-4-46 20-89 46-89s48 30 46 89" stroke="#f97461" strokeWidth="19" fill="none" strokeLinecap="round" />
                <path d="M118 181c-2-31 8-56 26-56s27 19 27 56" stroke="#ffecc9" strokeWidth="18" fill="none" strokeLinecap="round" />
                <text x="139" y="228" textAnchor="middle" fontFamily="Fredoka, Trebuchet MS, sans-serif" fontSize="32" fontWeight="700" fill="#4b347d">
                  A JUGAR
                </text>
                <path d="M63 252h153" stroke="#4b347d" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Carta de juego */}
              <g transform="translate(385 275) rotate(12 66 102)" filter="url(#heroShadow)">
                <rect x="0" y="0" width="134" height="194" rx="12" fill="#f8f4f0" stroke="white" strokeWidth="9" />
                <rect x="12" y="12" width="110" height="167" rx="8" fill="#d8edd8" />
                <circle cx="66" cy="68" r="30" fill="#fa795f" />
                <path d="M58 64q9-14 18 0M58 77q9 11 18 0" stroke="#4b347d" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M28 118q38-32 75 0M30 134q36-20 73 0" fill="none" stroke="#6c5396" strokeWidth="8" strokeLinecap="round" />
                <path d="M42 38l7-12 7 12" fill="#ffcc68" />
              </g>

              {/* Caja de bloques didácticos */}
              <g transform="translate(60 344) rotate(-9)" filter="url(#heroShadow)">
                <rect width="135" height="105" rx="14" fill="#eaa46f" />
                <path d="M0 54h135M68 0v105" stroke="#d78e53" strokeWidth="3" />
                <rect x="14" y="12" width="109" height="82" rx="9" fill="url(#woody)" />
                <path d="M32 68l32-35 37 35" fill="#fb8067" />
                <path d="M47 70V57h35v13" fill="#6850a0" />
                <circle cx="85" cy="40" r="10" fill="#fff5d7" />
              </g>

              {/* Dado de madera naranja */}
              <g transform="translate(17 190) rotate(10)" filter="url(#heroShadow)">
                <rect x="0" y="0" width="96" height="95" rx="16" fill="#fa795f" />
                <path d="M48 13v69M15 47h65" stroke="#ffb79e" strokeWidth="4" />
                <circle cx="26" cy="25" r="6" fill="#fff1d2" />
                <circle cx="68" cy="25" r="6" fill="#fff1d2" />
                <circle cx="26" cy="70" r="6" fill="#fff1d2" />
                <circle cx="68" cy="70" r="6" fill="#fff1d2" />
              </g>

              {/* Puzzle estrella */}
              <g transform="translate(445 115) rotate(15)" filter="url(#heroShadow)">
                <rect x="0" y="0" width="99" height="99" rx="14" fill="#fce1a5" />
                <path d="M11 12h77v74H11Z" fill="#ecc27f" />
                <path d="M50 17 61 40l25 4-18 18 4 25-22-11-22 11 5-25-18-18 25-4Z" fill="#fff4d9" />
              </g>

              {/* Ficha morada */}
              <g transform="translate(365 443) rotate(-13)">
                <rect x="0" y="0" width="83" height="65" rx="12" fill="#8d77c6" stroke="rgba(255,255,255,0.5)" strokeWidth="4" />
                <circle cx="25" cy="22" r="6" fill="#fff" />
                <circle cx="58" cy="22" r="6" fill="#fff" />
                <circle cx="42" cy="44" r="6" fill="#fff" />
              </g>

              {/* Chispas y destellos */}
              <g fill="#fa795f">
                <path d="m80 122 8 19 20 7-20 7-8 19-7-19-20-7 20-7Z" />
                <path d="m514 378 8 17 18 5-18 6-8 17-6-17-18-6 18-5Z" />
              </g>

              <g fill="none" stroke="#4b347d" strokeWidth="4" strokeLinecap="round">
                <path d="m116 110-10-13m29 5 2-17M544 244l20-6m-10 27 17 8" />
              </g>

              <g fill="#e7a56d">
                <circle cx="126" cy="451" r="10" />
                <circle cx="469" cy="90" r="7" />
              </g>
            </svg>

            {/* Sello "HECHO PARA IMAGINAR" */}
            <div className="absolute right-[-1%] bottom-[6%] w-[116px] h-[116px] sm:w-[126px] sm:h-[126px] grid place-items-center text-center bg-[#ecf19f] rounded-[36%_64%_55%_45%_/_48%_39%_61%_52%] font-display font-bold text-sm sm:text-base leading-tight rotate-[13deg] shadow-[7px_9px_0_rgba(75,52,125,0.09)] z-20 text-[#2d2943]">
              HECHO
              <br />
              PARA
              <br />
              IMAGINAR ✳
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
