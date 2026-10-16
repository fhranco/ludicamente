"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "@/components/ui/icons"

interface DynamicBannerProps {
  customAnnouncement?: string
}

const DEFAULT_MESSAGES = [
  {
    icon: "📍",
    text: "TIENDA EN PUNTA ARENAS · Retiro inmediato y despacho en el día en la comuna",
    accent: "#ffd678",
  },
  {
    icon: "❄️",
    text: "ENVÍOS EXPEDITOS A MAGALLANES · Puerto Natales, Porvenir y todo Chile",
    accent: "#ecf19f",
  },
  {
    icon: "🎁",
    text: "¿CUMPLEAÑOS O REGALO ESPECIAL? · Empaque con dedicatoria gratis en tu pedido",
    accent: "#ffb4a2",
  },
  {
    icon: "💬",
    text: "ATENCIÓN LOCAL POR WHATSAPP · Te asesoramos para elegir según la edad",
    accent: "#bbf7d0",
  },
]

export function DynamicBanner({ customAnnouncement }: DynamicBannerProps) {
  const messages = customAnnouncement
    ? [
        {
          icon: "✳️",
          text: customAnnouncement,
          accent: "#ffd678",
        },
        ...DEFAULT_MESSAGES,
      ]
    : DEFAULT_MESSAGES

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused, messages.length])

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % messages.length)
  }

  const current = messages[currentIndex]

  return (
    <aside
      aria-label="Aviso comercial dinámico"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-[#3a2762] text-white min-h-[38px] flex items-center justify-between px-3 sm:px-6 py-1.5 text-[0.72rem] sm:text-[0.76rem] font-bold tracking-[0.03em] select-none border-b border-white/10"
    >
      {/* Botón flecha izquierda */}
      <button
        onClick={handlePrev}
        aria-label="Aviso anterior"
        className="w-6 h-6 rounded-full hover:bg-white/15 grid place-items-center text-white/70 hover:text-white transition-colors shrink-0"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Contenido animado del mensaje */}
      <div className="flex-1 flex items-center justify-center text-center overflow-hidden px-2">
        <div
          key={currentIndex}
          className="flex items-center justify-center gap-2 flex-wrap animate-in fade-in slide-in-from-bottom-1 duration-300"
        >
          <span className="text-sm shrink-0">{current.icon}</span>
          <span style={{ color: current.accent }} className="hidden sm:inline">
            ✦
          </span>
          <span className="leading-snug">{current.text}</span>
          <span style={{ color: current.accent }} className="hidden sm:inline">
            ✦
          </span>
        </div>
      </div>

      {/* Botón flecha derecha e indicadores */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="hidden md:flex items-center gap-1 mr-1">
          {messages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a aviso ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx
                  ? "w-4 bg-[#ffd678]"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          aria-label="Siguiente aviso"
          className="w-6 h-6 rounded-full hover:bg-white/15 grid place-items-center text-white/70 hover:text-white transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  )
}
