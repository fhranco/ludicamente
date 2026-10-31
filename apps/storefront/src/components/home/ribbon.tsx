"use client"

import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AiSparklesIcon,
  RocketIcon,
  DiceFaces01Icon,
  PuzzleIcon,
} from "@hugeicons/core-free-icons"

export function Ribbon() {
  const items = [
    { text: "MENOS PANTALLAS, MÁS AVENTURAS", icon: AiSparklesIcon },
    { text: "CREAR · DESCUBRIR · COMPARTIR", icon: RocketIcon },
    { text: "QUE EL JUEGO NUNCA TERMINE", icon: DiceFaces01Icon },
    { text: "JUEGOS CON SENTIDO", icon: PuzzleIcon },
    { text: "MENOS PANTALLAS, MÁS AVENTURAS", icon: AiSparklesIcon },
    { text: "CREAR · DESCUBRIR · COMPARTIR", icon: RocketIcon },
    { text: "QUE EL JUEGO NUNCA TERMINE", icon: DiceFaces01Icon },
    { text: "JUEGOS CON SENTIDO", icon: PuzzleIcon },
  ]

  return (
    <div
      className="bg-[#FFF2B3] border-y border-[#fae899] overflow-hidden select-none"
      aria-label="Cultura lúdica y juego creativo"
    >
      <div className="animate-ribbon items-center gap-10 py-3.5 text-[#39265B] font-display font-semibold text-sm sm:text-base">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="whitespace-nowrap tracking-wide">{item.text}</span>
            <HugeiconsIcon
              icon={item.icon}
              size={18}
              strokeWidth={2.2}
              className="w-4.5 h-4.5 text-[#fa795f] shrink-0 inline-block"
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
