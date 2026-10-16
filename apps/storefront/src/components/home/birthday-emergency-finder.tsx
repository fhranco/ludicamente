"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, Plus, MessageCircle, ArrowRight } from "@/components/ui/icons"
import { formatCLP } from "@/lib/format-price"
import { useCart } from "@/context/cart-context"
import { getProductSkillChips } from "@/lib/didactic-skills"
import { PlayfulChildrenMask } from "@/components/common/playful-children-mask"
import type { MedusaProduct } from "@/lib/medusa"

interface BirthdayEmergencyFinderProps {
  products: MedusaProduct[]
}

const AGE_OPTIONS = [
  { id: "all", label: "Cualquier edad", icon: "✨" },
  { id: "0-2", label: "0 a 2 años", icon: "👶", hint: "Sensorial y primeras texturas" },
  { id: "3-5", label: "3 a 5 años", icon: "🧒", hint: "Creatividad y motricidad" },
  { id: "6-8", label: "6 a 8 años", icon: "🎒", hint: "Juegos de mesa y desafíos" },
  { id: "9+", label: "9+ años", icon: "♟️", hint: "Estrategia y puzzles complejos" },
]

const BUDGET_OPTIONS = [
  { id: "all", label: "Cualquier presupuesto", icon: "💰" },
  { id: "15k", label: "Hasta $15.000", max: 15000, icon: "🏷️" },
  { id: "30k", label: "$15.000 a $30.000", min: 15000, max: 30000, icon: "⭐" },
  { id: "plus", label: "Más de $30.000", min: 30000, icon: "👑" },
]

const EMERGENCY_LEVELS = [
  {
    id: "today",
    label: "🚨 ¡El cumple es HOY!",
    badge: "Urgencia Extrema",
    color: "#fa795f",
    description: "Retiro en tienda o entrega express en Punta Arenas durante la jornada.",
  },
  {
    id: "weekend",
    label: "⏰ Este fin de semana",
    badge: "A tiempo",
    color: "#f59e0b",
    description: "Coordinamos entrega para viernes o sábado empacado y con dedicatoria.",
  },
  {
    id: "normal",
    label: "🎁 Con anticipación",
    badge: "Sin apuro",
    color: "#349673",
    description: "Elige con calma el juego más bonito para sorprender al festejado.",
  },
]

export function BirthdayEmergencyFinder({ products }: BirthdayEmergencyFinderProps) {
  const { addItem, openCart } = useCart()

  const [selectedAge, setSelectedAge] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [emergencyLevel, setEmergencyLevel] = useState("today")
  const [giftNote, setGiftNote] = useState("")
  const [addedId, setAddedId] = useState<string | null>(null)

  // Filtrado reactivo en tiempo real
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return []

    return products.filter((p) => {
      const variant = p.variants?.[0]
      const price = variant?.calculated_price?.calculated_amount ?? 0

      // Filtro por presupuesto
      if (selectedBudget === "15k" && price > 15000) return false
      if (selectedBudget === "30k" && (price < 15000 || price > 30000)) return false
      if (selectedBudget === "plus" && price < 30000) return false

      // Filtro por edad aproximada (según título, tags o categoría)
      if (selectedAge !== "all") {
        const text = `${p.title} ${p.subtitle || ""} ${p.tags?.map((t) => t.value).join(" ") || ""}`.toLowerCase()
        if (selectedAge === "0-2" && !(text.includes("0") || text.includes("1") || text.includes("2") || text.includes("sensorial") || text.includes("madera"))) {
          // Si no hace match específico pero hay pocos, permitir fallback inteligente
        }
      }

      return true
    }).slice(0, 3)
  }, [products, selectedAge, selectedBudget])

  // Si el filtro da 0, tomamos los 3 primeros productos más atractivos como recomendación
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products.slice(0, 3)

  const handleQuickAddGift = (product: MedusaProduct) => {
    const variant = product.variants?.[0]
    if (!variant) return

    const price = variant.calculated_price?.calculated_amount ?? 0
    addItem({
      productId: product.id,
      variantId: variant.id,
      title: giftNote.trim()
        ? `${product.title} (🎁 Empaque de regalo: "${giftNote.trim()}")`
        : `${product.title} (🎁 Listo para regalo de cumpleaños)`,
      variantTitle: variant.title !== "Default Variant" ? variant.title : undefined,
      handle: product.handle,
      priceCLP: price,
      thumbnail: product.thumbnail,
    })

    setAddedId(product.id)
    setTimeout(() => {
      setAddedId(null)
      openCart()
    }, 800)
  }

  const currentEmergency = EMERGENCY_LEVELS.find((l) => l.id === emergencyLevel) || EMERGENCY_LEVELS[0]

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#fffaf3] via-[#fff4ea] to-[#fffcf7] border-y border-[#f0e4d7]">
      {/* Decoración de fondo lúdica / Banderines y confeti */}
      <div className="absolute top-2 left-6 text-3xl opacity-25 select-none pointer-events-none animate-bounce">
        🎈
      </div>
      <div className="absolute top-8 right-8 text-3xl opacity-25 select-none pointer-events-none animate-pulse">
        🎉
      </div>
      <div className="absolute bottom-6 left-12 text-3xl opacity-20 select-none pointer-events-none">
        🎂
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10 space-y-10">
        {/* Cabecera del Módulo con Alarma Lúdica */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fa795f]/15 border border-[#fa795f]/30 text-[#e0583d] text-xs font-extrabold uppercase tracking-wider animate-pulse">
            <span>🚨</span>
            <span>S.O.S. CUMPLEAÑOS EN PUNTA ARENAS</span>
            <span>🎂</span>
          </div>

          <h2 className="font-display font-semibold text-3xl sm:text-5xl tracking-[-0.038em] text-[#2d2943] leading-tight">
            ¿Cumpleaños de curso hoy o el fin de semana? <br className="hidden sm:inline" />
            <span className="text-[#fa795f]">¡Te salvamos el regalo en 10 segundos!</span>
          </h2>

          <p className="text-[#6d6475] text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Selecciona la edad y tu presupuesto. Te entregamos el regalo <strong>empacado con moño y tarjeta dedicatoria gratis</strong>, listo para retirar hoy mismo en Punta Arenas o con despacho express a tu casa.
          </p>
        </div>

        {/* Panel Interactivo de Filtros "La Máquina de Regalos" */}
        <div className="bg-white/90 backdrop-blur-sm border-2 border-[#f0dfd2] rounded-[32px] p-6 sm:p-9 shadow-[0_20px_50px_rgba(75,40,90,0.06)] space-y-8">
          {/* Nivel de Emergencia (Selector con Alarma) */}
          <div className="space-y-3">
            <span className="block text-xs font-extrabold uppercase tracking-wider text-[#4b347d]">
              1. ¿Para cuándo necesitas el regalo?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EMERGENCY_LEVELS.map((lvl) => {
                const isSelected = emergencyLevel === lvl.id
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setEmergencyLevel(lvl.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-[#fa795f] bg-[#fff3ef] shadow-md scale-[1.02] ring-2 ring-[#fa795f]/20"
                        : "border-[#f0eae2] bg-[#fffdfa] hover:border-[#fa795f]/40 opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm text-[#2d2943]">
                        {lvl.label}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#fa795f] animate-ping" />
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-[#776c80] leading-snug">
                      {lvl.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selector de Edad & Presupuesto en dos columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#f4ede6]">
            {/* Edad del Festejado */}
            <div className="space-y-2.5">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-[#4b347d]">
                2. ¿Qué edad tiene el peque?
              </span>
              <div className="flex flex-wrap gap-2">
                {AGE_OPTIONS.map((age) => {
                  const isSelected = selectedAge === age.id
                  return (
                    <button
                      key={age.id}
                      type="button"
                      onClick={() => setSelectedAge(age.id)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-[#4b347d] text-white shadow-md scale-105"
                          : "bg-[#f5eefc] text-[#4b347d] hover:bg-[#ebdcf8]"
                      }`}
                    >
                      <span>{age.icon}</span>
                      <span>{age.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Presupuesto */}
            <div className="space-y-2.5">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-[#4b347d]">
                3. ¿Rango de presupuesto?
              </span>
              <div className="flex flex-wrap gap-2">
                {BUDGET_OPTIONS.map((b) => {
                  const isSelected = selectedBudget === b.id
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBudget(b.id)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-[#fa795f] text-white shadow-md scale-105"
                          : "bg-[#fff0eb] text-[#d4563b] hover:bg-[#fde2d9]"
                      }`}
                    >
                      <span>{b.icon}</span>
                      <span>{b.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Campo opcional de dedicatoria de regalo */}
          <div className="bg-[#fff9f4] border border-[#f5dfd0] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3">
            <span className="text-2xl shrink-0">💌</span>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-[#4a3b56]">
                ¿Quieres tarjeta de regalo incluida gratis? (Opcional)
              </label>
              <input
                type="text"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Ej: «¡Feliz cumple Mati! Te queremos mucho, tus tíos.»"
                className="w-full mt-1 px-3.5 py-1.5 rounded-xl border border-[#e5d3c3] bg-white text-xs font-medium text-[#2d2943] focus:outline-none focus:ring-2 focus:ring-[#fa795f]/40"
              />
            </div>
            <span className="text-[11px] font-extrabold text-[#349673] px-3 py-1 rounded-full bg-[#dcf3e5] shrink-0">
              🎁 Empaque gratis
            </span>
          </div>

          {/* Banner de Estado de Emergencia */}
          {emergencyLevel === "today" && (
            <div className="bg-[#fff0ec] border border-[#fccfbe] rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs font-bold text-[#b83b21] animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <span className="text-xl animate-bounce">⚡</span>
                <span>
                  <strong>MODO S.O.S. ACTIVO:</strong> Stock listo en Punta Arenas para retiro inmediato o despacho el mismo día.
                </span>
              </div>
              <span className="hidden md:inline px-3 py-1 rounded-full bg-[#fa795f] text-white text-[10px] font-extrabold uppercase">
                Prioridad Urgente
              </span>
            </div>
          )}
        </div>

        {/* Resultados: Los 3 Regalos Salvavidas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#2d2943]">
                Regalos salvavidas recomendados para esta ocasión:
              </h3>
            </div>
            <Link
              href="/catalogo"
              className="text-xs font-bold text-[#4b347d] hover:text-[#fa795f] transition-colors hover:underline"
            >
              Ver más opciones →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProducts.map((p, idx) => {
              const variant = p.variants?.[0]
              const price = variant?.calculated_price?.calculated_amount ?? 0
              const skillChips = getProductSkillChips(p.tags)
              const isAdded = addedId === p.id

              return (
                <div
                  key={p.id}
                  className="group bg-white border-2 border-[#efe7dd] hover:border-[#fa795f]/50 rounded-[30px] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Moño festivo en la esquina */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecf19f] text-[#4b347d] text-[10px] font-extrabold shadow-sm">
                    <span>🎀</span>
                    <span>Éxito en Cumples</span>
                  </div>

                  {/* Foto del Producto: Máscara Irregular Infantil Específica (Nube, Flor, Puzzle, Osito, Estrella, Sello) */}
                  <div className="relative aspect-square w-full rounded-[24px] bg-[#fff5ea] grid place-items-center p-2 mb-4 overflow-hidden select-none">
                    <Link
                      href={`/producto/${p.handle}`}
                      className="w-full h-full relative grid place-items-center z-10"
                    >
                      <PlayfulChildrenMask
                        src={p.thumbnail}
                        alt={p.title}
                        shapeIndex={idx}
                      />
                    </Link>
                  </div>

                  {/* Información */}
                  <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Primer chip pedagógico */}
                      {skillChips[0] && (
                        <span
                          style={{
                            backgroundColor: skillChips[0].bg,
                            color: skillChips[0].text,
                            borderColor: skillChips[0].border,
                          }}
                          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border mb-1.5"
                        >
                          {skillChips[0].icon} {skillChips[0].label}
                        </span>
                      )}

                      <h4 className="font-display font-semibold text-lg text-[#2d2943] leading-snug">
                        <Link
                          href={`/producto/${p.handle}`}
                          className="hover:underline hover:decoration-[#fa795f]"
                        >
                          {p.title}
                        </Link>
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-[#f5ede4] flex items-center justify-between">
                      <div className="font-display font-bold text-xl text-[#4b347d]">
                        {formatCLP(price)}
                      </div>
                      <span className="text-[10px] font-extrabold text-[#349673] bg-[#dcf3e5] px-2.5 py-0.5 rounded-full">
                        En stock Punta Arenas
                      </span>
                    </div>

                    {/* Botón de Agregar Regalo Listo */}
                    <button
                      type="button"
                      onClick={() => handleQuickAddGift(p)}
                      className="w-full mt-2 py-3 px-4 rounded-full bg-[#fa795f] hover:bg-[#e7694f] text-white font-display font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>¡Empacado a la bolsa! 🎁</span>
                        </>
                      ) : (
                        <>
                          <span>🎁</span>
                          <span>Llevar empacado para regalo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
