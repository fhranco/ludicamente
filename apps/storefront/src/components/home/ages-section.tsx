import React from "react"
import Link from "next/link"

interface AgesSectionProps {
  onSelectAge?: (age: number) => void
}

const AGE_CARDS = [
  {
    age: "2+",
    title: "Primeros hallazgos",
    subtitle: "De 2 a 3 años",
    bubbleBg: "#e8dcff",
    spark: "✳",
  },
  {
    age: "4+",
    title: "Manos creativas",
    subtitle: "De 4 a 5 años",
    bubbleBg: "#ffe2e2",
    spark: "✦",
  },
  {
    age: "6+",
    title: "Mentes curiosas",
    subtitle: "De 6 a 7 años",
    bubbleBg: "#d8f2df",
    spark: "✳",
  },
  {
    age: "8+",
    title: "Grandes desafíos",
    subtitle: "Desde 8 años",
    bubbleBg: "#ecf19f",
    spark: "✦",
  },
]

export function AgesSection({ onSelectAge }: AgesSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-[#fff9ef] select-none" id="edades">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
              <span className="ml-2">PARA CADA ETAPA</span>
            </div>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.5rem] tracking-[-0.042em] text-[#2d2943] mt-2">
              Creciendo <span className="text-[#fa795f]">jugando.</span>
            </h2>
          </div>
          <p className="max-w-md text-[#77727d] text-[0.96rem] font-semibold leading-relaxed">
            El juego cambia con cada etapa. Explora ideas según los años y las ganas de descubrir.
          </p>
        </div>

        {/* Grilla de 4 Edades */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
          {AGE_CARDS.map((card) => (
            <Link
              key={card.age}
              href="/tienda"
              className="group relative min-h-[175px] sm:min-h-[192px] bg-white border-2 border-[#f0e9e3] hover:border-[#4b347d] rounded-[25px] flex flex-col justify-center items-center text-center p-5 overflow-hidden transition-all duration-200 hover:-translate-y-1.5 shadow-sm"
            >
              {/* Sparkle de fondo */}
              <span
                className="absolute top-2.5 right-4 text-[#eadff5] font-display text-3xl select-none pointer-events-none"
                aria-hidden="true"
              >
                {card.spark}
              </span>

              {/* Burbuja con la edad */}
              <div
                style={{ backgroundColor: card.bubbleBg }}
                className="w-16 h-16 rounded-[24px] grid place-items-center font-display font-bold text-2xl sm:text-3xl text-[#4b347d] -rotate-[7deg] group-hover:rotate-0 transition-transform"
              >
                {card.age}
              </div>

              {/* Título y Subtítulo */}
              <strong className="font-display font-semibold text-lg sm:text-[1.24rem] text-[#2d2943] mt-3">
                {card.title}
              </strong>
              <small className="font-extrabold text-[0.75rem] text-[#837a84] mt-0.5">
                {card.subtitle}
              </small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
