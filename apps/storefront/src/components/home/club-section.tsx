"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "@/components/ui/icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon } from "@hugeicons/core-free-icons"

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
    <section className="relative py-20 sm:py-24 bg-[#DDF6E6] overflow-hidden select-none" id="club">
      {/* Estrellas y chispas decorativas flotantes */}
      <div
        className="hidden md:block absolute left-12 top-14 w-12 h-12 pointer-events-none -rotate-12 opacity-80"
        aria-hidden="true"
      >
        <Image
          src="/home/decorations/estrella-amarilla.svg"
          alt=""
          width={48}
          height={48}
          className="w-full h-auto"
        />
      </div>
      <div
        className="hidden md:block absolute right-16 bottom-12 w-10 h-10 pointer-events-none rotate-12 opacity-80"
        aria-hidden="true"
      >
        <Image
          src="/home/decorations/estrella-amarilla.svg"
          alt=""
          width={40}
          height={40}
          className="w-full h-auto"
        />
      </div>

      <div className="max-w-[880px] mx-auto px-4 sm:px-8 text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#bce8cb] text-[#2e8b57] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase shadow-xs mb-3">
          <span>✦</span>
          <span>ALGO BUENO ESTÁ POR COMENZAR</span>
        </div>

        {/* Título */}
        <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-[4rem] leading-[1.08] tracking-[-0.04em] text-[#2d2943]">
          El club de las <span className="text-[#39265B]">buenas ideas.</span>
        </h2>

        {/* Párrafo */}
        <p className="text-[#516b5a] text-base sm:text-[1.05rem] font-semibold leading-relaxed max-w-xl mx-auto my-4 sm:my-6">
          Sé parte de nuestra comunidad y recibe novedades, ideas de juego, promociones exclusivas y contenido para inspirarte.
        </p>

        {/* Formulario */}
        {submitted ? (
          <div className="bg-white/95 rounded-full px-7 py-4 max-w-[530px] mx-auto shadow-sm text-sm font-bold text-[#39265B] border border-[#cbe9d6]">
            ¡Gracias por sumarte a Lúdicamente! ✳ Te escribiremos con novedades y juegos especiales.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center max-w-[530px] mx-auto gap-2 bg-white p-2 rounded-full shadow-[0_12px_32px_rgba(46,139,87,0.12)] border border-[#cbe9d6]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              className="border-0 outline-none flex-1 min-w-0 px-4 py-2.5 bg-transparent text-[#2d2943] font-semibold text-sm sm:text-base placeholder:text-[#95a89b]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-[#39265B] hover:bg-[#2d1e48] text-white px-6 sm:px-7 py-3 rounded-full font-extrabold text-sm whitespace-nowrap shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>¡Me sumo!</span>
              <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={2} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
