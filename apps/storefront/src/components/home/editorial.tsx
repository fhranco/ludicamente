import React from "react"
import { ArrowRight } from "@/components/ui/icons"

export function Editorial() {
  return (
    <section className="py-20 sm:py-24 bg-[#fae0d6] overflow-hidden select-none">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.03fr] gap-12 lg:gap-16 items-center">
          {/* Ilustración Editorial con Sello */}
          <div className="relative min-h-[340px] sm:min-h-[440px] lg:min-h-[495px] grid place-items-center order-2 lg:order-1">
            {/* Mancha de fondo durazno */}
            <div
              className="w-[85%] h-[83%] absolute bg-[#f4c5ba] rounded-[40%_60%_52%_48%_/_54%_40%_60%_46%] rotate-[8deg]"
              aria-hidden="true"
            />

            <svg
              viewBox="0 0 590 480"
              className="w-[94%] max-w-[550px] relative drop-shadow-[0_20px_15px_rgba(147,89,65,0.18)]"
              role="img"
              aria-label="Ilustración editorial de juegos creativos compartidos"
            >
              <ellipse cx="295" cy="435" rx="245" ry="33" fill="#ab8c89" opacity="0.17" />
              <g transform="translate(83 50) rotate(-9 207 180)">
                <rect x="0" y="0" width="415" height="346" rx="28" fill="#fffdf3" stroke="#f7ebd9" strokeWidth="7" />
                <path d="M0 77h415" stroke="#ead7cd" strokeWidth="3" />
                <path d="M31 31h180" stroke="#735c96" strokeWidth="13" strokeLinecap="round" />
                <circle cx="355" cy="40" r="19" fill="#f8d578" />
                <circle cx="355" cy="40" r="7" fill="#fcf6e5" />
                <path d="M61 246c12-98 67-129 113-129s99 52 97 128" stroke="#7656ad" strokeWidth="35" fill="none" strokeLinecap="round" />
                <path d="M89 247c6-74 41-100 85-100s69 35 72 100" stroke="#f98775" strokeWidth="31" fill="none" strokeLinecap="round" />
                <path d="M119 249c4-43 26-73 55-73s49 29 52 73" stroke="#f8c765" strokeWidth="28" fill="none" strokeLinecap="round" />
                <path d="M145 250c2-22 14-42 29-42s27 18 28 42" stroke="#9cc9b5" strokeWidth="27" fill="none" strokeLinecap="round" />
                <path d="M321 146l19-24 19 24-19 21Z" fill="#fa795f" />
                <path d="m332 204 11-22 10 22 23 5-17 17 4 23-20-11-19 11 4-23-18-17Z" fill="#e8bb62" />
                <circle cx="339" cy="295" r="17" fill="#a98bd7" />
                <path d="M46 303h215M50 322h133" stroke="#ddd7d0" strokeWidth="7" strokeLinecap="round" />
              </g>
              <g transform="translate(392 292) rotate(20)">
                <rect width="135" height="112" rx="19" fill="#765ba8" />
                <rect x="16" y="16" width="103" height="80" rx="10" fill="#ded6f7" />
                <path d="M30 80l26-50 19 34 14-21 16 37Z" fill="#f9bf68" />
              </g>
              <g transform="translate(22 320) rotate(-15)">
                <rect width="133" height="77" rx="17" fill="#f4ae78" />
                <path d="M24 45l35-21 50 21-50 19Z" fill="#ffe6aa" />
              </g>
              <path d="m64 100 10-25 10 25 24 7-24 7-10 25-10-25-24-7Z" fill="#ffd678" />
              <path d="m512 99 7-17 7 17 17 6-17 6-7 17-7-17-17-6Z" fill="#9269b8" />
            </svg>

            {/* Sello "MÁS TIEMPO JUNTOS ♡" */}
            <div className="absolute right-2 bottom-[8%] w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] rounded-full bg-[#ecf19f] grid place-items-center text-center font-display font-bold text-sm sm:text-[0.95rem] leading-tight rotate-[12deg] shadow-md text-[#2d2943]">
              MÁS
              <br />
              TIEMPO
              <br />
              JUNTOS ♡
            </div>
          </div>

          {/* Texto Editorial */}
          <div className="order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 text-[#875b71] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
              <span className="ml-2">POR QUÉ NOS GUSTA JUGAR</span>
            </div>

            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[4.2rem] leading-[1.05] tracking-[-0.042em] text-[#2d2943] max-w-[610px]">
              Los mejores recuerdos no necesitan{" "}
              <em className="not-italic text-[#fa795f]">batería.</em>
            </h2>

            <p className="text-[#76616a] text-base sm:text-[1.02rem] font-semibold leading-[1.8] max-w-[485px]">
              Un juego sobre la mesa, colores por todas partes y una idea que termina siendo mil. Creemos en esas tardes que se recuerdan, en las preguntas curiosas y en la maravilla de crear algo con las manos.
            </p>

            <div className="pt-2">
              <a
                href="#filosofia"
                className="inline-flex items-center justify-center gap-2.5 bg-[#4b347d] hover:bg-[#392559] text-white px-7 py-3.5 sm:py-4 rounded-full font-extrabold text-[0.93rem] shadow-[0_7px_0_#3925591a] hover:-translate-y-0.5 transition-all"
              >
                <span>Conoce nuestra inspiración</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <span className="inline-block font-display font-semibold text-lg sm:text-[1.32rem] text-[#4b347d] -rotate-[3deg] pt-4">
              La magia ocurre <span className="text-[#fa795f]">cuando jugamos. ✳</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
