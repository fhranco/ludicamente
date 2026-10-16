"use client"

import React, { useState } from "react"
import { ArrowRight } from "@/components/ui/icons"

export function ClubSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail("")
  }

  return (
    <section className="relative py-20 sm:py-24 bg-[#d8f2df] overflow-hidden select-none" id="club">
      <div className="max-w-[880px] mx-auto px-4 sm:px-8 text-center relative">
        {/* Decoraciones Estelares */}
        <span
          className="hidden md:block absolute -left-16 top-8 font-display text-8xl text-[#aacfae] -rotate-12 select-none pointer-events-none"
          aria-hidden="true"
        >
          ✳
        </span>
        <span
          className="hidden md:block absolute -right-16 bottom-6 text-7xl text-[#e89079] rotate-12 select-none pointer-events-none"
          aria-hidden="true"
        >
          ✦
        </span>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
          <span className="ml-2">ALGO BONITO ESTÁ POR COMENZAR</span>
        </div>

        {/* Título */}
        <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[4.2rem] leading-[1.05] tracking-[-0.042em] text-[#2d2943] mt-3">
          El club de las <span className="text-[#684a9a]">buenas ideas.</span>
        </h2>

        {/* Párrafo */}
        <p className="text-[#627469] text-base sm:text-[1.02rem] font-semibold leading-relaxed max-w-xl mx-auto my-4 sm:my-6">
          Un rincón para descubrir juegos, actividades y nuevas formas de disfrutar el tiempo juntos.
        </p>

        {/* Formulario */}
        {submitted ? (
          <div className="bg-white/90 rounded-full px-6 py-4 max-w-[530px] mx-auto shadow-sm text-sm font-bold text-[#4b347d]">
            ¡Gracias por sumarte a Lúdicamente! ✳ Te escribiremos con novedades y juegos especiales.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center max-w-[530px] mx-auto gap-2 bg-white p-2 rounded-full shadow-[0_10px_30px_rgba(56,96,59,0.08)]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              className="border-0 outline-none flex-1 min-w-0 px-4 py-2.5 bg-transparent text-[#2d2943] font-semibold text-sm sm:text-base placeholder:text-[#a09a96]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-[#4b347d] hover:bg-[#392559] text-white px-5 sm:px-6 py-3 rounded-full font-extrabold text-sm whitespace-nowrap shadow-sm transition-all"
            >
              <span>¡Me sumo!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[0.72rem] text-[#79877d] font-semibold mt-4">
          Comunidad familiar y pedagógica en Chile. Cero spam, solo inspiración para jugar.
        </p>
      </div>
    </section>
  )
}
