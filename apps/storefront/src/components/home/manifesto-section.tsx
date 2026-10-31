"use client"

import React from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { RocketIcon, Idea01Icon, UserGroupIcon } from "@hugeicons/core-free-icons"

export function ManifestoSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#EEE4FF] select-none border-b border-[#e5d8ff]" id="filosofia">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Lado Izquierdo: Manifiesto con Acento Vectorial */}
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[3.8rem] leading-[1.08] tracking-[-0.04em] text-[#2d2943] max-w-[580px] mx-auto lg:mx-0">
              No son solo juguetes. <br />
              Son <span className="text-[#fa795f]">posibilidades.</span>
            </h2>

            <p className="text-[#64597b] text-base sm:text-[1.05rem] font-semibold leading-[1.75] max-w-[500px] pt-1 mx-auto lg:mx-0">
              Queremos que cada juego abra nuevas ideas, fortalezca sus habilidades y les dé la confianza para explorar el mundo.
            </p>

            {/* Acento decorativo */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <div className="w-12 h-auto opacity-75">
                <Image
                  src="/home/decorations/destello-coral.svg"
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Lado Derecho: 3 Píldoras de Valor */}
          <div className="space-y-3.5 max-w-xl mx-auto lg:mx-0 w-full">
            {/* Beneficio 1 */}
            <div className="bg-white/85 backdrop-blur-sm border border-white/90 p-4 sm:p-5 rounded-[22px] flex items-center gap-4 shadow-[0_8px_20px_rgba(72,49,103,0.04)]">
              <div className="w-12 h-12 rounded-[16px] bg-[#DDF6E6] grid place-items-center shrink-0 text-[#2e8b57]">
                <HugeiconsIcon icon={RocketIcon} size={24} strokeWidth={2} className="text-[#2e8b57]" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-bold text-base sm:text-[1.05rem] text-[#2d2943]">
                  Creatividad sin límites
                </h3>
                <p className="text-xs sm:text-[0.85rem] font-semibold text-[#73697e] mt-0.5">
                  Ideas que se transforman en grandes historias.
                </p>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-white/85 backdrop-blur-sm border border-white/90 p-4 sm:p-5 rounded-[22px] flex items-center gap-4 shadow-[0_8px_20px_rgba(72,49,103,0.04)]">
              <div className="w-12 h-12 rounded-[16px] bg-[#FFE2D4] grid place-items-center shrink-0 text-[#fa795f]">
                <HugeiconsIcon icon={Idea01Icon} size={24} strokeWidth={2} className="text-[#fa795f]" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-bold text-base sm:text-[1.05rem] text-[#2d2943]">
                  Curiosidad en movimiento
                </h3>
                <p className="text-xs sm:text-[0.85rem] font-semibold text-[#73697e] mt-0.5">
                  Preguntas que hacen descubrimientos.
                </p>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-white/85 backdrop-blur-sm border border-white/90 p-4 sm:p-5 rounded-[22px] flex items-center gap-4 shadow-[0_8px_20px_rgba(72,49,103,0.04)]">
              <div className="w-12 h-12 rounded-[16px] bg-[#FFF0BB] grid place-items-center shrink-0 text-[#b48011]">
                <HugeiconsIcon icon={UserGroupIcon} size={24} strokeWidth={2} className="text-[#b48011]" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-bold text-base sm:text-[1.05rem] text-[#2d2943]">
                  Juegos que nos acercan
                </h3>
                <p className="text-xs sm:text-[0.85rem] font-semibold text-[#73697e] mt-0.5">
                  Más tiempo real, menos pantallas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
