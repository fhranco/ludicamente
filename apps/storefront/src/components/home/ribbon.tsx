import React from "react"

export function Ribbon() {
  const items = [
    { text: "MENOS PANTALLAS, MÁS AVENTURAS", star: "✳" },
    { text: "CREAR · DESCUBRIR · COMPARTIR", star: "✷" },
    { text: "QUE EL JUEGO NUNCA TERMINE", star: "✳" },
    { text: "JUEGOS CON SENTIDO", star: "✦" },
    { text: "MENOS PANTALLAS, MÁS AVENTURAS", star: "✳" },
    { text: "CREAR · DESCUBRIR · COMPARTIR", star: "✷" },
    { text: "QUE EL JUEGO NUNCA TERMINE", star: "✳" },
    { text: "JUEGOS CON SENTIDO", star: "✦" },
  ]

  return (
    <div
      className="bg-[#ecf19f] border-y border-[#e2e8a1] overflow-hidden select-none"
      aria-label="Cultura lúdica y juego creativo"
    >
      <div className="animate-ribbon items-center gap-9 py-3.5 text-[#4b347d] font-display font-semibold text-base sm:text-[1.1rem]">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="whitespace-nowrap">{item.text}</span>
            <span className="text-xl text-[#fa795f] leading-none" aria-hidden="true">
              {item.star}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
