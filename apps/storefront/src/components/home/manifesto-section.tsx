import React from "react"

export function ManifestoSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#e5ddf7] select-none" id="filosofia">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.07fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Lado Izquierdo: Manifiesto */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
              <span className="ml-2">NUESTRA FORMA DE VER EL MUNDO</span>
            </div>

            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[4rem] leading-[1.07] tracking-[-0.042em] text-[#2d2943] max-w-[610px]">
              No son solo juguetes. Son{" "}
              <span className="text-[#fa795f]">posibilidades.</span>
            </h2>

            <p className="text-[#665c7b] text-base sm:text-[1.02rem] font-semibold leading-[1.75] max-w-[525px] pt-2">
              Queremos que Ludicamente sea un lugar que inspire ideas, encuentros y descubrimientos. Un universo colorido, cercano y pensado para quienes creen que jugar sigue siendo algo muy serio. Y muy entretenido.
            </p>
          </div>

          {/* Lado Derecho: 3 Features */}
          <div className="grid gap-4.5">
            {/* Feature 1 */}
            <div className="bg-[#fffcf7]/80 backdrop-blur-sm border border-white/80 p-5 sm:p-6 rounded-[23px] flex items-center gap-5 shadow-[0_10px_28px_rgba(72,49,103,0.05)]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] bg-[#d8f2df] grid place-items-center flex-shrink-0">
                <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9">
                  <path
                    d="M24 3 29 18l16 6-16 6-5 15-6-15L3 24l15-6Z"
                    fill="#fa795f"
                    stroke="#4b347d"
                    strokeWidth="2.2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg sm:text-[1.22rem] text-[#2d2943]">
                  Creatividad sin instrucciones
                </h3>
                <p className="font-sans font-semibold text-[0.82rem] sm:text-[0.88rem] text-[#797283] leading-relaxed mt-0.5">
                  Ideas que invitan a imaginar, construir y empezar otra vez.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#fffcf7]/80 backdrop-blur-sm border border-white/80 p-5 sm:p-6 rounded-[23px] flex items-center gap-5 shadow-[0_10px_28px_rgba(72,49,103,0.05)]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] bg-[#ffe2e2] grid place-items-center flex-shrink-0">
                <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9">
                  <path
                    d="M14 31c-4-3-7-8-7-13C7 8 15 2 24 2s17 6 17 16c0 5-3 10-7 13l-3 4H17Z"
                    fill="#ffd678"
                    stroke="#4b347d"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M17 35h14M18 40h12M22 45h4M24 20v11m-6-11 6 5 6-5"
                    stroke="#4b347d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg sm:text-[1.22rem] text-[#2d2943]">
                  Curiosidad en movimiento
                </h3>
                <p className="font-sans font-semibold text-[0.82rem] sm:text-[0.88rem] text-[#797283] leading-relaxed mt-0.5">
                  Porque cada «¿y si…?» puede abrir un mundo nuevo.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#fffcf7]/80 backdrop-blur-sm border border-white/80 p-5 sm:p-6 rounded-[23px] flex items-center gap-5 shadow-[0_10px_28px_rgba(72,49,103,0.05)]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] bg-[#ecf19f] grid place-items-center flex-shrink-0">
                <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9">
                  <circle cx="15" cy="14" r="7" fill="#fa795f" stroke="#4b347d" strokeWidth="2" />
                  <circle cx="34" cy="16" r="7" fill="#ffd678" stroke="#4b347d" strokeWidth="2" />
                  <path
                    d="M3 43V32c0-6 5-10 12-10 6 0 11 4 11 10v11M24 43V33c0-6 4-10 10-10s11 4 11 10v10"
                    stroke="#4b347d"
                    strokeWidth="2"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg sm:text-[1.22rem] text-[#2d2943]">
                  Juegos que nos acercan
                </h3>
                <p className="font-sans font-semibold text-[0.82rem] sm:text-[0.88rem] text-[#797283] leading-relaxed mt-0.5">
                  Momentos para compartir con amigos, familia o en solitario.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
