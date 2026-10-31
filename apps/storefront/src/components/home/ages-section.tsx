"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "@/components/ui/icons"

interface AgesSectionProps {
  onSelectAge?: (age: number) => void
}

const AGE_CARDS = [
  {
    age: "0 a 2 años",
    label: "Primeras habilidades",
    bg: "#FFF5EA",
    image: "/home/ages/edad-0-2.webp",
    alt: "Bebé explorando sonajeros y juguetes sensoriales de madera",
    query: "0-2",
  },
  {
    age: "3 a 5 años",
    label: "Más creatividad",
    bg: "#DDF6E6",
    image: "/home/ages/edad-3-5.webp",
    alt: "Niño concentrado armando figuras con bloques de colores",
    query: "3-5",
  },
  {
    age: "6 a 8 años",
    label: "Mentes curiosas",
    bg: "#EEE4FF",
    image: "/home/ages/edad-6-8.webp",
    alt: "Niña pintando y dibujando con materiales creativos",
    query: "6-8",
  },
  {
    age: "9 a 12 años",
    label: "Grandes desafíos",
    bg: "#FCE4EC",
    image: "/home/ages/edad-9-12.webp",
    alt: "Joven resolviendo un puzzle o juego de estrategia",
    query: "9+",
  },
]

export function AgesSection({ onSelectAge }: AgesSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-[#fffcf7] select-none" id="edades">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff4ea] border border-[#f0dac7] text-[#fa795f] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase mb-2">
              <span>✦</span>
              <span>PARA CADA ETAPA</span>
              <span>✦</span>
            </div>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.5rem] tracking-[-0.042em] text-[#2d2943] mt-1">
              Creciendo <span className="text-[#fa795f]">jugando.</span>
            </h2>
          </div>
          <p className="max-w-md text-[#77727d] text-[0.96rem] font-semibold leading-relaxed">
            El juego evoluciona con ellos. Encuentra opciones seguras, entretenidas y desafiantes.
          </p>
        </div>

        {/* Grilla de 4 Edades con Fotografía */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {AGE_CARDS.map((card) => {
            return (
              <Link
                key={card.age}
                href="/tienda"
                style={{ backgroundColor: card.bg }}
                className="group relative rounded-[28px] p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(70,47,82,0.1)] border border-black/[0.03]"
              >
                {/* Rótulo Superior con la Edad */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#39265B] text-xs sm:text-sm font-display font-extrabold shadow-xs">
                    {card.age}
                  </span>
                </div>

                {/* Fotografía recortada con fondo transparente destacada en grande */}
                <div className="relative w-full aspect-[1/1] sm:aspect-[4/3.8] my-1 flex items-center justify-center">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 320px"
                    className="object-contain drop-shadow-[0_12px_20px_rgba(75,52,125,0.14)] group-hover:scale-108 transition-transform duration-300"
                  />
                </div>

                {/* Pie con Etiqueta y Flecha Circular */}
                <div className="flex items-center justify-between gap-2 pt-2 mt-auto">
                  <span className="font-display font-bold text-sm sm:text-base text-[#2d2943]">
                    {card.label}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white text-[#fa795f] group-hover:bg-[#fa795f] group-hover:text-white grid place-items-center shadow-xs shrink-0 transition-colors">
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
