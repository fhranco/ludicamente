"use client"

import React, { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, ArrowRight, ArrowLeft, RefreshCw, X } from "@/components/ui/icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  RocketIcon,
  PartyPopperIcon,
  AlarmClockIcon,
  GiftIcon,
  Baby01Icon,
  PaintBoardIcon,
  Backpack01Icon,
  DiceFaces01Icon,
  AiSparklesIcon,
  DiscountTag01Icon,
  StarIcon,
  CrownIcon,
  FavouriteIcon,
  BirthdayCakeIcon,
  Mail01Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons"
import { formatCLP } from "@/lib/format-price"
import { useCart } from "@/context/cart-context"
import { getProductSkillChips } from "@/lib/didactic-skills"
import { getProductMedia } from "@/lib/product-media"
import type { MedusaProduct } from "@/lib/medusa"

interface BirthdayEmergencyFinderProps {
  products: MedusaProduct[]
}

function parseIconSize(size: number | string, fallback: number): number {
  if (typeof size === "number") return size
  const num = parseInt(size.replace(/[^\d]/g, ""), 10)
  if (isNaN(num)) return fallback
  return num <= 12 ? num * 4 : num
}

function renderEmergencyIcon(id: string, size: number | string = 26) {
  const s = parseIconSize(size, 26)
  switch (id) {
    case "today":
      return <HugeiconsIcon icon={RocketIcon} size={s} strokeWidth={2} className="text-[#fa795f]" />
    case "weekend":
      return <HugeiconsIcon icon={PartyPopperIcon} size={s} strokeWidth={2} className="text-[#e8932b]" />
    default:
      return <HugeiconsIcon icon={GiftIcon} size={s} strokeWidth={2} className="text-[#349673]" />
  }
}

function renderAgeIcon(id: string, size: number | string = 24) {
  const s = parseIconSize(size, 24)
  switch (id) {
    case "0-2":
      return <HugeiconsIcon icon={Baby01Icon} size={s} strokeWidth={1.8} className="text-[#8a5fb5]" />
    case "3-5":
      return <HugeiconsIcon icon={PaintBoardIcon} size={s} strokeWidth={1.8} className="text-[#fa795f]" />
    case "6-8":
      return <HugeiconsIcon icon={Backpack01Icon} size={s} strokeWidth={1.8} className="text-[#2563eb]" />
    case "9+":
      return <HugeiconsIcon icon={DiceFaces01Icon} size={s} strokeWidth={1.8} className="text-[#e8932b]" />
    default:
      return <HugeiconsIcon icon={AiSparklesIcon} size={s} strokeWidth={1.8} className="text-[#8a5fb5]" />
  }
}

function renderBudgetIcon(id: string, size: number | string = 20) {
  const s = parseIconSize(size, 20)
  switch (id) {
    case "15k":
      return <HugeiconsIcon icon={DiscountTag01Icon} size={s} strokeWidth={2} className="text-[#349673]" />
    case "30k":
      return <HugeiconsIcon icon={StarIcon} size={s} strokeWidth={2} className="text-[#e8932b]" />
    case "plus":
      return <HugeiconsIcon icon={CrownIcon} size={s} strokeWidth={2} className="text-[#8a5fb5]" />
    default:
      return <HugeiconsIcon icon={FavouriteIcon} size={s} strokeWidth={2} className="text-[#fa795f]" />
  }
}

function renderStepIcon(step: number, size: number | string = 18) {
  const s = parseIconSize(size, 18)
  switch (step) {
    case 1:
      return <HugeiconsIcon icon={RocketIcon} size={s} strokeWidth={2} className="text-[#fa795f]" />
    case 2:
      return <HugeiconsIcon icon={BirthdayCakeIcon} size={s} strokeWidth={1.8} className="text-[#8a5fb5]" />
    case 3:
      return <HugeiconsIcon icon={DiscountTag01Icon} size={s} strokeWidth={2} className="text-[#e8932b]" />
    default:
      return <HugeiconsIcon icon={Mail01Icon} size={s} strokeWidth={1.8} className="text-[#349673]" />
  }
}

// 4 PASOS LÚDICOS DE LA MISIÓN
const WIZARD_STEPS = [
  { step: 1, title: "¿Para cuándo?", shortLabel: "Fecha", color: "#fa795f" },
  { step: 2, title: "¿Qué edad?", shortLabel: "Edad", color: "#8a5fb5" },
  { step: 3, title: "¿Presupuesto?", shortLabel: "Presupuesto", color: "#e8932b" },
  { step: 4, title: "¡Dedicatoria!", shortLabel: "Tarjeta & Moño", color: "#349673" },
]

const EMERGENCY_LEVELS = [
  {
    id: "today",
    label: "¡El cumple es HOY!",
    badge: "¡Entrega Hoy!",
    iconBg: "#ffe7e1",
    tagline: "¡Salvamos el festejo en minutos!",
    description: "Retiro inmediato en tienda o despacho veloz en Punta Arenas hoy mismo.",
    highlightBadge: "Stock físico listo",
  },
  {
    id: "weekend",
    label: "Este fin de semana",
    badge: "Justo a tiempo",
    iconBg: "#fef3c7",
    tagline: "Ideal para el cumple de curso",
    description: "Coordinamos entrega para viernes o sábado empacado con dedicatoria.",
    highlightBadge: "Entrega programada",
  },
  {
    id: "normal",
    label: "Con anticipación",
    badge: "Con calma y cariño",
    iconBg: "#dcfce7",
    tagline: "Elige el tesoro más especial",
    description: "Descubre con tiempo el juego más lindo para sorprender y emocionar.",
    highlightBadge: "Selección pensada",
  },
]

const AGE_OPTIONS = [
  {
    id: "0-2",
    label: "0 a 2 años",
    stage: "Primeros pasos",
    cardBg: "#f7f2fc",
    activeBg: "#efe4fa",
    borderColor: "#cbabf5",
    tag: "Sensorial & Texturas",
    hint: "Texturas suaves, estímulo sensorial y madera noble segura.",
  },
  {
    id: "3-5",
    label: "3 a 5 años",
    stage: "Manos creativas",
    cardBg: "#fff1f3",
    activeBg: "#ffe1e6",
    borderColor: "#fda4af",
    tag: "Imaginación & Bloques",
    hint: "Motricidad fina, puzzles simples, pintar y juego simbólico.",
  },
  {
    id: "6-8",
    label: "6 a 8 años",
    stage: "Mentes curiosas",
    cardBg: "#f0f9ff",
    activeBg: "#e0f2fe",
    borderColor: "#7dd3fc",
    tag: "Juegos de Mesa & Retos",
    hint: "Juegos de mesa en familia, retos lógicos y experimentos.",
  },
  {
    id: "9+",
    label: "9+ años",
    stage: "Grandes desafíos",
    cardBg: "#fefce8",
    activeBg: "#fef9c3",
    borderColor: "#fde047",
    tag: "Estrategia & Puzzles",
    hint: "Estrategia, enigmas, puzzles complejos y destreza mental.",
  },
  {
    id: "all",
    label: "Cualquier edad",
    stage: "¡Para todos!",
    cardBg: "#faf8f5",
    activeBg: "#f4ebe0",
    borderColor: "#d9cbbf",
    tag: "Favoritos universales",
    hint: "Los juguetes y juegos favoritos que nunca fallan en un cumpleaños.",
  },
]

const BUDGET_OPTIONS = [
  {
    id: "15k",
    label: "Hasta $15.000",
    stage: "Detalle lindo",
    max: 15000,
    cardBg: "#ecfdf5",
    activeBg: "#d1fae5",
    borderColor: "#6ee7b7",
    hint: "Juegos de cartas, ingenio y regalitos didácticos con encanto.",
  },
  {
    id: "30k",
    label: "$15.000 a $30.000",
    stage: "El más elegido",
    min: 15000,
    max: 30000,
    cardBg: "#fff7ed",
    activeBg: "#ffedd5",
    borderColor: "#fdba74",
    hint: "El rango preferido para celebraciones de curso y amigos cercanos.",
  },
  {
    id: "plus",
    label: "Más de $30.000",
    stage: "Súper regalo",
    min: 30000,
    cardBg: "#fdf4ff",
    activeBg: "#fae8ff",
    borderColor: "#f0abfc",
    hint: "Sets de construcción, juegos de mesa premiados y tesoros duraderos.",
  },
  {
    id: "all",
    label: "Cualquier presupuesto",
    stage: "Sin límites",
    cardBg: "#faf8f5",
    activeBg: "#f4ebe0",
    borderColor: "#d9cbbf",
    hint: "Muéstrame las mejores ideas de todo el catálogo didáctico.",
  },
]

// Dedicatorias rápidas prefabricadas para 1 solo clic
const QUICK_NOTES = [
  "¡Feliz cumple! Que te diviertas jugando y soñando mucho 🎈",
  "Con todo el amor de tus tíos que te quieren infinito ❤️",
  "Para el peque más curioso y alegre en su día especial 🎂",
  "¡Que este nuevo añito esté lleno de risas y juegos divertidos! ✨",
]

export function BirthdayEmergencyFinder({ products }: BirthdayEmergencyFinderProps) {
  const { addItem, openCart } = useCart()

  // Estado del paso actual en el Wizard
  const [currentStep, setCurrentStep] = useState<number>(1)

  // Opciones seleccionadas
  const [emergencyLevel, setEmergencyLevel] = useState("today")
  const [selectedAge, setSelectedAge] = useState("3-5")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [giftNote, setGiftNote] = useState("")
  const [addedId, setAddedId] = useState<string | null>(null)

  // Estado para la Ruleta Mágica / Ruleta Sorpresa
  const [isSpinning, setIsSpinning] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Estado del Popup / Modal de Recomendaciones
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Objetos activos para visualización rápida
  const currentEmergency = EMERGENCY_LEVELS.find((l) => l.id === emergencyLevel) || EMERGENCY_LEVELS[0]
  const currentAge = AGE_OPTIONS.find((a) => a.id === selectedAge) || AGE_OPTIONS[1]
  const currentBudget = BUDGET_OPTIONS.find((b) => b.id === selectedBudget) || BUDGET_OPTIONS[3]

  // Función para disparar confeti lúdico
  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2400)
  }

  // Desplazar suavemente a la sección de recomendaciones
  const scrollToRecommendations = () => {
    const el = document.getElementById("recomendados-cumpleanos")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Abrir recomendaciones (abre popup y activa scroll)
  const handleViewRecommendations = () => {
    triggerConfetti()
    setIsModalOpen(true)
  }

  // Ruleta Sorpresa de Regalo (Elige una combinación mágica divertida y muestra recomendaciones)
  const handleSurpriseSpin = () => {
    if (isSpinning) return
    setIsSpinning(true)

    const emergKeys = ["today", "weekend", "normal"]
    const ageKeys = ["0-2", "3-5", "6-8", "9+"]
    const budgetKeys = ["15k", "30k", "plus", "all"]

    const randomEmerg = emergKeys[Math.floor(Math.random() * emergKeys.length)]
    const randomAge = ageKeys[Math.floor(Math.random() * ageKeys.length)]
    const randomBudget = budgetKeys[Math.floor(Math.random() * budgetKeys.length)]

    setTimeout(() => {
      setEmergencyLevel(randomEmerg)
      setSelectedAge(randomAge)
      setSelectedBudget(randomBudget)
      setIsSpinning(false)
      triggerConfetti()
      setIsModalOpen(true)
      scrollToRecommendations()
    }, 550)
  }

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false)
      }
    }
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  // =========================================================================
  // MOTOR DE FILTRADO REACTIVO REAL POR EDAD Y PRESUPUESTO
  // =========================================================================
  const { displayProducts, exactMatchCount, isFallback } = useMemo(() => {
    if (!products || products.length === 0) {
      return { displayProducts: [], exactMatchCount: 0, isFallback: false }
    }

    // Evaluar cada producto con puntuación de afinidad
    const scoredProducts = products.map((p) => {
      const variant = p.variants?.[0]
      const price = variant?.calculated_price?.calculated_amount ?? 0

      // 1. Coincidencia de presupuesto
      let budgetMatch = true
      if (selectedBudget === "15k" && (price <= 0 || price > 15000)) budgetMatch = false
      if (selectedBudget === "30k" && (price < 15000 || price > 30000)) budgetMatch = false
      if (selectedBudget === "plus" && price < 30000) budgetMatch = false

      // 2. Coincidencia de edad según texto, categorías y tags
      const text = `${p.title} ${p.subtitle || ""} ${p.description || ""} ${p.tags?.map((t) => t.value).join(" ") || ""} ${p.categories?.map((c) => `${c.name} ${c.handle}`).join(" ") || ""}`.toLowerCase()

      let ageScore = 0
      if (selectedAge === "all") {
        ageScore = 5
      } else if (selectedAge === "0-2") {
        if (text.includes("primera-infancia") || text.includes("primera infancia")) ageScore += 10
        if (text.includes("sensorial") || text.includes("madera") || text.includes("bebé") || text.includes("bebe") || text.includes("gateo") || text.includes("mordedor") || text.includes("cuna") || text.includes("texturas") || text.includes("encaje")) ageScore += 8
        if (text.includes("0 a 2") || text.includes("0-2") || text.includes("1 año") || text.includes("2 años") || text.includes("meses")) ageScore += 12
      } else if (selectedAge === "3-5") {
        if (text.includes("arte") || text.includes("creatividad") || text.includes("motricidad") || text.includes("bloques") || text.includes("puzzle") || text.includes("manualidad") || text.includes("pintar") || text.includes("construccion")) ageScore += 8
        if (text.includes("3 a 5") || text.includes("3-5") || text.includes("3+") || text.includes("4+") || text.includes("5+") || text.includes("preescolar")) ageScore += 12
      } else if (selectedAge === "6-8") {
        if (text.includes("mesa") || text.includes("tablero") || text.includes("cartas") || text.includes("amigos") || text.includes("familia") || text.includes("reto") || text.includes("desafio") || text.includes("ingenio") || text.includes("logica")) ageScore += 8
        if (text.includes("6 a 8") || text.includes("6-8") || text.includes("6+") || text.includes("7+") || text.includes("8+")) ageScore += 12
      } else if (selectedAge === "9+") {
        if (text.includes("estrategia") || text.includes("catan") || text.includes("puzzle") || text.includes("complejo") || text.includes("ciencia") || text.includes("stem") || text.includes("robotica") || text.includes("enigmas")) ageScore += 8
        if (text.includes("9+") || text.includes("10+") || text.includes("12+") || text.includes("juvenil") || text.includes("avanzado")) ageScore += 12
      }

      return {
        product: p,
        price,
        ageScore,
        budgetMatch,
      }
    })

    // Coincidencias estrictas
    const strictMatches = scoredProducts
      .filter((item) => item.budgetMatch && (selectedAge === "all" || item.ageScore > 0))
      .sort((a, b) => b.ageScore - a.ageScore)
      .map((item) => item.product)

    if (strictMatches.length > 0) {
      return {
        displayProducts: strictMatches.slice(0, 6),
        exactMatchCount: strictMatches.length,
        isFallback: false,
      }
    }

    // Coincidencias por presupuesto (si la edad fue muy restrictiva en la base de datos)
    const budgetMatches = scoredProducts
      .filter((item) => item.budgetMatch)
      .map((item) => item.product)

    if (budgetMatches.length > 0) {
      return {
        displayProducts: budgetMatches.slice(0, 6),
        exactMatchCount: budgetMatches.length,
        isFallback: true,
      }
    }

    // Coincidencias por edad (si el presupuesto no tiene coincidencias exactas)
    const ageMatches = scoredProducts
      .filter((item) => selectedAge === "all" || item.ageScore > 0)
      .sort((a, b) => b.ageScore - a.ageScore)
      .map((item) => item.product)

    if (ageMatches.length > 0) {
      return {
        displayProducts: ageMatches.slice(0, 6),
        exactMatchCount: ageMatches.length,
        isFallback: true,
      }
    }

    // Fallback con los primeros productos del catálogo
    return {
      displayProducts: products.slice(0, 6),
      exactMatchCount: products.length,
      isFallback: true,
    }
  }, [products, selectedAge, selectedBudget])

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
    triggerConfetti()
    setTimeout(() => {
      setAddedId(null)
      openCart()
    }, 800)
  }

  const handleResetFilters = () => {
    setEmergencyLevel("today")
    setSelectedAge("3-5")
    setSelectedBudget("all")
    setGiftNote("")
    setCurrentStep(1)
  }

  // Porcentaje de progreso de la misión
  const progressPercent = (currentStep / 4) * 100

  return (
    <section id="cumpleanos" className="py-14 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#fffaf3] via-[#fff4ea] to-[#fffcf7] border-y-2 border-[#f0dfd2] scroll-mt-12">
      {/* =========================================================================
          CONFETI Y ANIMACIONES FESTIVAS FLOTANTES
         ========================================================================= */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden select-none">
          {Array.from({ length: 32 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 3.1) % 100}%`,
                top: `${(i * 7.3) % 40}%`,
                animationDelay: `${(i * 45) % 400}ms`,
                backgroundColor: ["#fa795f", "#ffd678", "#349673", "#8a5fb5", "#7dd3fc"][i % 5],
              }}
              className="absolute w-3 h-3 rounded-full animate-bounce opacity-85 shadow-sm"
            />
          ))}
        </div>
      )}

      {/* Decoración de fondo */}
      <div className="absolute top-4 left-6 select-none pointer-events-none opacity-20 animate-bounce text-[#fa795f]">
        <HugeiconsIcon icon={AiSparklesIcon} size={36} strokeWidth={1.5} />
      </div>
      <div className="absolute top-12 right-8 select-none pointer-events-none opacity-20 animate-pulse text-[#8a5fb5]">
        <HugeiconsIcon icon={DiceFaces01Icon} size={36} strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-8 left-10 select-none pointer-events-none opacity-15 text-[#349673]">
        <HugeiconsIcon icon={BirthdayCakeIcon} size={32} strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-16 right-12 select-none pointer-events-none opacity-15 text-[#e8932b]">
        <HugeiconsIcon icon={StarIcon} size={32} strokeWidth={1.5} />
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10 space-y-10">
        {/* =========================================================================
            CABECERA PRINCIPAL: PROPUESTA APROBADA REGALOS Y CUMPLEAÑOS
           ========================================================================= */}
        <div className="bg-[#fff4ea] border-2 border-[#f0dac7] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(75,52,125,0.06)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr] gap-8 lg:gap-14 items-center">
            {/* Columna Izquierda: Fotografía Niño con Autos y Corona Coral en tamaño grande */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[520px]">
                {/* Corona Coral Vectorial Flotante */}
                <div
                  className="absolute -top-9 sm:-top-12 left-[15%] w-16 sm:w-20 h-auto z-20 pointer-events-none drop-shadow-xs -rotate-6"
                  aria-hidden="true"
                >
                  <Image
                    src="/home/decorations/corona-coral.svg"
                    alt=""
                    width={80}
                    height={60}
                    className="w-full h-auto"
                  />
                </div>

                {/* Fotografía recortada con fondo transparente destacada en grande */}
                <div className="relative w-full aspect-[1100/816] flex items-center justify-center">
                  <Image
                    src="/home/photos/nino-jugando-autos.webp"
                    alt="Niño jugando feliz en el suelo con autitos de madera y juguetes creativos"
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-contain drop-shadow-[0_16px_30px_rgba(75,52,125,0.14)]"
                  />
                </div>
              </div>
            </div>

            {/* Columna Derecha: Título, Copys y Píldoras Interactivas */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#ecd8c6] text-[#fa795f] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase shadow-xs">
                <span>✦</span>
                <span>LA FORMA MÁS LINDA DE REGALAR, JUGAR Y APRENDER</span>
                <span>✦</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.8rem] tracking-[-0.04em] text-[#2d2943] leading-tight">
                ¿Cumpleaños sorpresa o de curso? <br className="hidden sm:inline" />
                <span className="text-[#fa795f]">Te armamos el regalo perfecto jugando.</span>
              </h2>

              <p className="text-[#6d6475] text-sm sm:text-[0.96rem] font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
                Elige el jugador, cuéntanos un poco y te ayudamos a encontrar juegos según su edad, intereses y ocasión. También puedes explorar nuestras sugerencias.
              </p>

              {/* Botones / Píldoras de exploración interactiva */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4.5 py-2.5 rounded-full bg-white border border-[#e8d7c8] hover:border-[#fa795f] text-[#2d2943] text-xs sm:text-sm font-display font-bold shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#ffe7e1] text-[#fa795f] grid place-items-center">
                    <HugeiconsIcon icon={Baby01Icon} size={14} strokeWidth={2} />
                  </span>
                  <span>Para niño o niña</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4.5 py-2.5 rounded-full bg-white border border-[#e8d7c8] hover:border-[#fa795f] text-[#2d2943] text-xs sm:text-sm font-display font-bold shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#fef3c7] text-[#e8932b] grid place-items-center">
                    <HugeiconsIcon icon={GiftIcon} size={14} strokeWidth={2} />
                  </span>
                  <span>Para una ocasión especial</span>
                </button>

                <button
                  type="button"
                  onClick={handleViewRecommendations}
                  className="px-4.5 py-2.5 rounded-full bg-[#4b347d] hover:bg-[#392559] text-white text-xs sm:text-sm font-display font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <HugeiconsIcon icon={AiSparklesIcon} size={15} strokeWidth={2} className="text-[#ffd678]" />
                  <span>Ver lo que recomendamos para ti</span>
                </button>

                <button
                  type="button"
                  onClick={handleSurpriseSpin}
                  disabled={isSpinning}
                  className="px-3.5 py-2 rounded-full bg-white/70 border border-[#e8d7c8] text-[#784e03] hover:bg-white text-xs font-display font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <HugeiconsIcon icon={DiceFaces01Icon} size={14} strokeWidth={2} className={isSpinning ? "animate-spin" : ""} />
                  <span>Ruleta</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CAMINO MÁGICO DE 4 FICHAS / STEPPER DE JUGUETE
           ========================================================================= */}
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="h-2.5 w-full bg-[#f2e7dc] rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-[#fa795f] via-[#ffd678] to-[#349673] rounded-full transition-all duration-300 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
            {WIZARD_STEPS.map((s) => {
              const isActive = currentStep === s.step
              const isPast = currentStep > s.step

              let stepSummary = ""
              if (s.step === 1) stepSummary = currentEmergency.label.replace("¡", "").replace("!", "")
              if (s.step === 2) stepSummary = currentAge.label
              if (s.step === 3) stepSummary = currentBudget.label
              if (s.step === 4) stepSummary = giftNote.trim() ? "Con dedicatoria" : "Empaque gratis"

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStep(s.step)}
                  className={`relative p-3.5 sm:p-4 rounded-[22px] border-2 text-left transition-all duration-200 select-none cursor-pointer flex flex-col justify-between min-h-[94px] ${
                    isActive
                      ? "bg-white border-[#fa795f] shadow-[0_12px_28px_rgba(250,121,95,0.22)] ring-4 ring-[#fa795f]/15 scale-[1.03] -translate-y-1"
                      : isPast
                      ? "bg-[#fffcf8] border-[#e7dacd] hover:border-[#fa795f]/60 hover:bg-white shadow-xs"
                      : "bg-[#fffdfa]/70 border-[#f0eae1] hover:border-[#fa795f]/40 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-full grid place-items-center font-display font-bold text-xs ${
                          isActive
                            ? "bg-[#fa795f] text-white shadow-sm"
                            : isPast
                            ? "bg-[#349673] text-white"
                            : "bg-[#ebdcd0] text-[#5c4966]"
                        }`}
                      >
                        {isPast ? "✓" : s.step}
                      </span>
                      <span className="shrink-0">{renderStepIcon(s.step)}</span>
                    </div>

                    {isActive && (
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fa795f] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fa795f]" />
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="block font-display font-bold text-xs sm:text-sm text-[#2d2943]">
                      {s.title}
                    </span>
                    <span className="block text-[11px] font-bold text-[#86768e] truncate mt-0.5">
                      {stepSummary}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* =========================================================================
            CONSOLA PRINCIPAL DEL PASO ACTIVO (TARJETA LÚDICA)
           ========================================================================= */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border-3 border-[#eddcd0] rounded-[34px] p-6 sm:p-9 shadow-[0_22px_60px_rgba(75,40,90,0.08)] relative overflow-hidden">
          {/* =====================================================================
              PASO 1: ¿PARA CUÁNDO ES EL REGALO?
             ===================================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f3eae0] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-2xl bg-[#ffece8]">
                    {renderStepIcon(1, 24)}
                  </span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#fa795f]">
                      Paso 1 de 4 • Coordinación
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2d2943]">
                      ¿Para cuándo necesitas tener el regalo en tus manos?
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#7d7185] bg-[#faf4ec] px-3 py-1 rounded-full border border-[#ede3d7] self-start sm:self-auto">
                  Elige 1 opción 👇
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {EMERGENCY_LEVELS.map((lvl) => {
                  const isSelected = emergencyLevel === lvl.id
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setEmergencyLevel(lvl.id)}
                      className={`group p-5 rounded-[26px] border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                        isSelected
                          ? "border-[#fa795f] bg-[#fff6f3] shadow-[0_10px_25px_rgba(250,121,95,0.18)] ring-2 ring-[#fa795f]/25 scale-[1.02]"
                          : "border-[#ede4da] bg-[#fffdfa] hover:border-[#fa795f]/50 hover:bg-white hover:-translate-y-0.5"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span
                            style={{ backgroundColor: lvl.iconBg }}
                            className="w-12 h-12 rounded-2xl grid place-items-center shadow-xs group-hover:scale-110 transition-transform"
                          >
                            {renderEmergencyIcon(lvl.id, 28)}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide bg-white border border-[#edd7c7] text-[#554060]">
                            {lvl.badge}
                          </span>
                        </div>

                        <strong className="block font-display font-bold text-base text-[#2d2943] leading-snug">
                          {lvl.label}
                        </strong>
                        <p className="text-xs font-semibold text-[#fa795f] mt-0.5">
                          {lvl.tagline}
                        </p>
                        <p className="text-[12px] font-medium text-[#6c6175] mt-2 leading-relaxed">
                          {lvl.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-4 border-t border-[#f3e9de] flex items-center justify-between text-[11px] font-bold">
                        <span className="text-[#349673] flex items-center gap-1">
                          <span>📦</span> {lvl.highlightBadge}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full grid place-items-center border-2 transition-all ${
                            isSelected
                              ? "bg-[#fa795f] border-[#fa795f] text-white shadow-xs"
                              : "border-[#d8cbdc] bg-white text-transparent group-hover:border-[#fa795f]"
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* =====================================================================
              PASO 2: ¿QUÉ EDAD TIENE EL PEQUE?
             ===================================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f3eae0] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-2 rounded-2xl bg-[#f5ecfc]">🎂</span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#8a5fb5]">
                      Paso 2 de 4 • Etapa de Desarrollo
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2d2943]">
                      ¿Cuántas velitas apaga o qué edad tiene?
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#7d7185] bg-[#faf4ec] px-3 py-1 rounded-full border border-[#ede3d7] self-start sm:self-auto">
                  Selecciona la edad del peque
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {AGE_OPTIONS.map((age) => {
                  const isSelected = selectedAge === age.id
                  return (
                    <button
                      key={age.id}
                      type="button"
                      onClick={() => setSelectedAge(age.id)}
                      className={`group p-4 rounded-[24px] border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-[#8a5fb5] bg-[#f7f2fc] shadow-[0_8px_20px_rgba(138,95,181,0.18)] ring-2 ring-[#8a5fb5]/20 scale-[1.02]"
                          : "border-[#ebe1d6] bg-[#fffdfa] hover:border-[#8a5fb5]/50 hover:bg-white hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-white border border-[#eee2db] grid place-items-center shadow-xs group-hover:rotate-6 transition-transform shrink-0">
                          {renderAgeIcon(age.id, 24)}
                        </span>
                        <div className="min-w-0">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white border border-[#e5d8ea] text-[#6b4793] mb-1">
                            {age.stage}
                          </span>
                          <strong className="block font-display font-bold text-base text-[#2d2943] leading-tight">
                            {age.label}
                          </strong>
                          <p className="text-[11px] font-medium text-[#73687c] mt-1 line-clamp-2">
                            {age.hint}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#eee4da] flex items-center justify-between text-[11px] font-bold">
                        <span className="text-[#8a5fb5]">{age.tag}</span>
                        <div
                          className={`w-5 h-5 rounded-full grid place-items-center border-2 text-xs transition-all ${
                            isSelected
                              ? "bg-[#8a5fb5] border-[#8a5fb5] text-white"
                              : "border-[#d8cbdc] bg-white text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* =====================================================================
              PASO 3: ¿CUÁL ES EL PRESUPUESTO?
             ===================================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f3eae0] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-2 rounded-2xl bg-[#fff3e0]">💰</span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#e8932b]">
                      Paso 3 de 4 • Rango de Inversión
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2d2943]">
                      ¿Cuánto te gustaría invertir en el regalo?
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#7d7185] bg-[#faf4ec] px-3 py-1 rounded-full border border-[#ede3d7] self-start sm:self-auto">
                  Ajustado a tu bolsillo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {BUDGET_OPTIONS.map((b) => {
                  const isSelected = selectedBudget === b.id
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBudget(b.id)}
                      className={`group p-4 rounded-[24px] border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-[#e8932b] bg-[#fff8ef] shadow-[0_8px_20px_rgba(232,147,43,0.18)] ring-2 ring-[#e8932b]/20 scale-[1.02]"
                          : "border-[#ece2d6] bg-[#fffdfa] hover:border-[#e8932b]/50 hover:bg-white hover:-translate-y-0.5"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-10 h-10 rounded-xl bg-white border border-[#eedfd2] grid place-items-center shadow-xs group-hover:scale-110 transition-transform">
                            {renderBudgetIcon(b.id, 20)}
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white border border-[#eedfd2] text-[#845d2e]">
                            {b.stage}
                          </span>
                        </div>

                        <strong className="block font-display font-bold text-base text-[#2d2943] leading-snug mt-1">
                          {b.label}
                        </strong>
                        <p className="text-[11px] font-medium text-[#73687c] mt-1.5 leading-relaxed">
                          {b.hint}
                        </p>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-[#efe4d8] flex items-center justify-end">
                        <div
                          className={`w-5 h-5 rounded-full grid place-items-center border-2 text-xs transition-all ${
                            isSelected
                              ? "bg-[#e8932b] border-[#e8932b] text-white"
                              : "border-[#d8cbdc] bg-white text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* =====================================================================
              PASO 4: ¡DEDICATORIA Y MOÑO GRATIS! (POSTAL ILUSTRADA)
             ===================================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f3eae0] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-2xl bg-[#e6f7ef] text-[#349673] grid place-items-center">
                    <HugeiconsIcon icon={Mail01Icon} size={24} strokeWidth={1.8} />
                  </span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#349673]">
                      Paso 4 de 4 • Toque Final Mágico
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2d2943]">
                      ¿Quieres tarjeta dedicatoria y moño gratis?
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-black text-[#349673] bg-[#dcf3e5] px-3.5 py-1 rounded-full border border-[#b2e5c6] self-start sm:self-auto flex items-center gap-1.5">
                  <HugeiconsIcon icon={GiftIcon} size={14} strokeWidth={2} />
                  <span>Incluido $0</span>
                </span>
              </div>

              <div className="bg-[#fffef9] border-2 border-dashed border-[#e3d1c1] rounded-[28px] p-5 sm:p-7 shadow-inner relative space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f3e6d8]">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#705646]">
                    <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.8} className="text-[#8a5fb5]" />
                    <span>CORREO LÚDICO • PUNTA ARENAS</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fcedbb] border border-[#f3dd8e] text-[#69480a] text-[11px] font-extrabold">
                    <HugeiconsIcon icon={GiftIcon} size={14} strokeWidth={2} className="text-[#845d2e]" />
                    <span>Empacado con moño artesanal</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#4a3b56]">
                    Escribe tu mensaje especial (lo prepararemos en una hermosa tarjeta física):
                  </label>
                  <textarea
                    rows={3}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Ej: «¡Feliz cumple Sofi! Que este nuevo año esté lleno de risas, juegos y descubrimientos. Te queremos mucho, tus tíos ❤️»"
                    className="w-full p-3.5 rounded-2xl border-2 border-[#e8d8c8] bg-white text-xs sm:text-sm font-medium text-[#2d2943] focus:outline-none focus:border-[#fa795f] focus:ring-4 focus:ring-[#fa795f]/15 transition-all resize-none shadow-xs placeholder:text-[#9c8f9e]"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-[#86758c]">
                    💡 Ideas rápidas (toca una para usarla):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_NOTES.map((note, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGiftNote(note)}
                        className="px-2.5 py-1 rounded-full bg-[#faf4ec] hover:bg-[#fa795f] hover:text-white border border-[#ebdccf] text-[11px] font-semibold text-[#66576d] transition-all cursor-pointer text-left"
                      >
                        {note.slice(0, 38)}...
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#f3e6d8]">
                  <div className="bg-[#faf5ee] p-2.5 rounded-xl border border-[#ede1d3] flex items-center gap-2 text-[11px] font-bold text-[#5e4f66]">
                    <HugeiconsIcon icon={GiftIcon} size={16} strokeWidth={2} className="text-[#fa795f]" />
                    <span>Moño de color a mano</span>
                  </div>
                  <div className="bg-[#faf5ee] p-2.5 rounded-xl border border-[#ede1d3] flex items-center gap-2 text-[11px] font-bold text-[#5e4f66]">
                    <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.8} className="text-[#8a5fb5]" />
                    <span>Tarjeta con tu mensaje</span>
                  </div>
                  <div className="bg-[#faf5ee] p-2.5 rounded-xl border border-[#ede1d3] flex items-center gap-2 text-[11px] font-bold text-[#5e4f66]">
                    <HugeiconsIcon icon={ShoppingBag01Icon} size={16} strokeWidth={1.8} className="text-[#349673]" />
                    <span>Bolsa bonita de regalo</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              BARRA DE NAVEGACIÓN Y CONTROLES DEL WIZARD (PIE DEL PANEL)
             ===================================================================== */}
          <div className="pt-6 mt-6 border-t-2 border-[#f4ede6] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2.5 rounded-full border-2 border-[#e4d7ca] hover:border-[#fa795f] bg-[#fffaf5] hover:bg-white text-xs font-bold text-[#5c4966] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Paso anterior</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-[#86788e] hover:text-[#fa795f] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reiniciar opciones</span>
                </button>
              )}
            </div>

            {/* Receta viva de selección actual */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#6d5e75] bg-[#faf3ea] px-3.5 py-1.5 rounded-full border border-[#eee2d4]">
              <span>🎯 Tu misión:</span>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="hover:text-[#fa795f] hover:underline flex items-center gap-1"
              >
                {renderEmergencyIcon(currentEmergency.id, 16)}
                <span>{currentEmergency.label.replace("¡", "").replace("!", "")}</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="hover:text-[#8a5fb5] hover:underline flex items-center gap-1"
              >
                {renderAgeIcon(currentAge.id, 16)}
                <span>{currentAge.label}</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="hover:text-[#e8932b] hover:underline flex items-center gap-1"
              >
                {renderBudgetIcon(currentBudget.id, 16)}
                <span>{currentBudget.label}</span>
              </button>
            </div>

            {/* Botón Siguiente o Abrir Recomendaciones */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#fa795f] hover:bg-[#e7694f] text-white font-display font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 hover:scale-[1.02]"
                >
                  <span>Siguiente paso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handleViewRecommendations()
                    scrollToRecommendations()
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#fa795f] to-[#e85e42] text-white font-display font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 hover:scale-[1.03] animate-pulse"
                >
                  <HugeiconsIcon icon={GiftIcon} size={18} strokeWidth={2} />
                  <span>¡Ver lo que recomendamos para ti!</span>
                </button>
              )}
            </div>
          </div>

          {/* Banner especial de Despacho Rápido HOY */}
          {emergencyLevel === "today" && (
            <div className="mt-6 bg-[#fff7f4] border-2 border-[#fccfbe] rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs font-bold text-[#b83b21] animate-in fade-in duration-300">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-xl bg-[#fa795f] text-white shrink-0">
                  <HugeiconsIcon icon={RocketIcon} size={18} strokeWidth={2} />
                </span>
                <span>
                  <strong>DESPACHO RÁPIDO HOY:</strong> Stock físico en Punta Arenas listo para retirar en tienda en minutos o con despacho prioritario durante el día.
                </span>
              </div>
              <span className="hidden md:inline px-3 py-1 rounded-full bg-[#fa795f] text-white text-[10px] font-extrabold uppercase shrink-0">
                Entrega Exprés
              </span>
            </div>
          )}
        </div>

        {/* =========================================================================
            SECCIÓN DEDICADA: "ESTO ES LO QUE RECOMENDAMOS PARA TI"
           ========================================================================= */}
        <div
          id="recomendados-cumpleanos"
          className="space-y-6 pt-8 pb-4 scroll-mt-24 border-t-2 border-[#f2e5d8]"
        >
          {/* Cabecera de la sección destacada */}
          <div className="bg-gradient-to-r from-[#fff7f2] via-[#fffbf6] to-[#f4f8f4] border-2 border-[#eedcd0] rounded-[30px] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fa795f] text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
                <HugeiconsIcon icon={GiftIcon} size={14} strokeWidth={2} />
                <span>SELECCIÓN INTELIGENTE PERSONALIZADA</span>
                <HugeiconsIcon icon={AiSparklesIcon} size={14} strokeWidth={2} />
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2d2943] leading-tight">
                Esto es lo que recomendamos para ti:
              </h3>

              {/* Píldoras activas del filtro */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold">
                <span className="text-[#6d5e75]">Filtros activos:</span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-3 py-1 rounded-full bg-[#f4ecfa] text-[#714b9c] border border-[#e1d0ed] hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
                >
                  {renderAgeIcon(currentAge.id, 14)}
                  <span>{currentAge.label}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-3 py-1 rounded-full bg-[#fef5e7] text-[#9c641b] border border-[#f5dfbc] hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
                >
                  {renderBudgetIcon(currentBudget.id, 14)}
                  <span>{currentBudget.label}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-3 py-1 rounded-full bg-[#ffece8] text-[#c24227] border border-[#f7cdca] hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
                >
                  {renderEmergencyIcon(currentEmergency.id, 14)}
                  <span>{currentEmergency.label.replace("¡", "").replace("!", "")}</span>
                </button>
              </div>

              {isFallback && (
                <p className="text-[11px] font-medium text-[#84758d] italic">
                  Nota: Mostramos las mejores opciones de la tienda cercanas a tus preferencias.
                </p>
              )}
            </div>

            {/* Botón para abrir el Popup / Modal */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 rounded-full bg-[#4b347d] hover:bg-[#3d2968] text-white font-display font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <HugeiconsIcon icon={AiSparklesIcon} size={16} strokeWidth={2} />
                <span>Abrir en ventana emergente (Popup)</span>
              </button>

              <Link
                href="/tienda"
                className="px-4 py-3 rounded-full border-2 border-[#e3d3c4] hover:border-[#fa795f] bg-white text-[#4b347d] hover:text-[#fa795f] font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Ver toda la tienda →</span>
              </Link>
            </div>
          </div>

          {/* Grilla de Productos Recomendados */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {displayProducts.map((p) => {
              const variant = p.variants?.[0]
              const price = variant?.calculated_price?.calculated_amount ?? 0
              const skillChips = getProductSkillChips(p.tags)
              const isAdded = addedId === p.id
              const itemMedia = getProductMedia(p)

              return (
                <div
                  key={p.id}
                  className="group bg-white border-2 border-[#efe7dd] hover:border-[#fa795f]/60 rounded-[30px] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Moño festivo en la esquina */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecf19f] text-[#4b347d] text-[10px] font-black shadow-xs">
                    <HugeiconsIcon icon={GiftIcon} size={13} strokeWidth={2} />
                    <span>Recomendado Cumples</span>
                  </div>

                  {/* Foto del Producto: Juguete transparente (default) y Niño jugando (hover) */}
                  <div className="relative aspect-square w-full rounded-[22px] bg-[#fff5ea] grid place-items-center p-3 mb-4 overflow-hidden select-none">
                    <Link
                      href={`/producto/${p.handle}`}
                      className="w-full h-full relative grid place-items-center z-10"
                    >
                      {itemMedia.cutout ? (
                        <div className="relative w-full h-full">
                          {/* 1. Solo el juguete con fondo transparente */}
                          <Image
                            src={itemMedia.cutout}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className={`object-contain p-2 transition-all duration-500 ease-out ${
                              itemMedia.actionPhoto
                                ? "group-hover:opacity-0 group-hover:scale-95"
                                : "group-hover:scale-105"
                            }`}
                          />
                          {/* 2. Niño/a usando el juguete (se revela en hover) */}
                          {itemMedia.actionPhoto && (
                            <Image
                              src={itemMedia.actionPhoto}
                              alt={`${p.title} en acción con niños`}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover rounded-[16px] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 text-[#fa795f]">
                          <HugeiconsIcon icon={GiftIcon} size={36} strokeWidth={1.5} />
                          <span className="text-xs font-bold text-[#8c8293] mt-1">Juguete Lúdicamente</span>
                        </div>
                      )}
                    </Link>
                  </div>

                  {/* Información */}
                  <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      {skillChips[0] && (
                        <span
                          style={{
                            backgroundColor: skillChips[0].bg,
                            color: skillChips[0].text,
                            borderColor: skillChips[0].border,
                          }}
                          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border mb-1.5"
                        >
                          {skillChips[0].label}
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
                      <span className="text-[10px] font-extrabold text-[#349673] bg-[#dcf3e5] px-2.5 py-0.5 rounded-full border border-[#bee7ce]">
                        En stock Punta Arenas
                      </span>
                    </div>

                    {/* Botón de Agregar Regalo Listo */}
                    <button
                      type="button"
                      onClick={() => handleQuickAddGift(p)}
                      className="w-full mt-2 py-3 px-4 rounded-full bg-[#fa795f] hover:bg-[#e7694f] text-white font-display font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>¡Empacado a la bolsa!</span>
                        </>
                      ) : (
                        <>
                          <HugeiconsIcon icon={GiftIcon} size={16} strokeWidth={2} />
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

      {/* =========================================================================
          POPUP MODAL INTERACTIVO: "ESTO ES LO QUE RECOMENDAMOS PARA TI"
         ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2d2943]/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Click fuera para cerrar */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Tarjeta del Modal */}
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-[#fffdfa] border-3 border-[#eed8c9] rounded-[36px] shadow-[0_25px_70px_rgba(45,41,67,0.35)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Cabecera del Modal */}
            <div className="p-5 sm:p-7 bg-gradient-to-r from-[#fff3ed] via-[#fff9f4] to-[#f5fbf7] border-b-2 border-[#f0dfd2] flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fa795f] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                  <HugeiconsIcon icon={GiftIcon} size={13} strokeWidth={2} />
                  <span>MISIÓN DE REGALO COMPLETADA</span>
                  <HugeiconsIcon icon={AiSparklesIcon} size={13} strokeWidth={2} />
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2d2943] leading-tight">
                  Esto es lo que recomendamos para ti:
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-[#6d6174]">
                  Para <strong>{currentAge.label}</strong> • Presupuesto <strong>{currentBudget.label}</strong> • {currentEmergency.label}
                </p>

                {giftNote.trim() && (
                  <div className="mt-2 inline-flex items-center gap-2 p-2 rounded-xl bg-white border border-[#ebd8c8] text-xs font-medium text-[#4a3b56]">
                    <HugeiconsIcon icon={Mail01Icon} size={15} strokeWidth={1.8} className="text-[#8a5fb5]" />
                    <span className="italic line-clamp-1">«{giftNote.trim()}»</span>
                    <span className="text-[10px] font-bold text-[#349673] bg-[#dcf3e5] px-2 py-0.5 rounded-full shrink-0">
                      Moño gratis
                    </span>
                  </div>
                )}
              </div>

              {/* Botón cerrar */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white border-2 border-[#edd8c8] hover:border-[#fa795f] grid place-items-center text-[#554760] hover:text-[#fa795f] transition-all cursor-pointer shadow-xs active:scale-90 shrink-0"
                aria-label="Cerrar ventana de recomendaciones"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido scrolleable del Modal */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-4 max-h-[60vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayProducts.map((p) => {
                  const variant = p.variants?.[0]
                  const price = variant?.calculated_price?.calculated_amount ?? 0
                  const isAdded = addedId === p.id
                  const modalMedia = getProductMedia(p)

                  return (
                    <div
                      key={p.id}
                      className="bg-white border-2 border-[#f0e6dc] rounded-[24px] p-4 flex gap-3.5 items-center hover:border-[#fa795f]/50 transition-all shadow-xs"
                    >
                      <div className="relative w-20 h-20 rounded-[18px] bg-[#fff5ea] shrink-0 p-1.5 overflow-hidden">
                        {modalMedia.cutout ? (
                          <Image
                            src={modalMedia.cutout}
                            alt={p.title}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full grid place-items-center text-[#fa795f]">
                            <HugeiconsIcon icon={GiftIcon} size={28} strokeWidth={1.5} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-display font-bold text-sm text-[#2d2943] truncate">
                          {p.title}
                        </h4>
                        <div className="font-display font-black text-base text-[#4b347d]">
                          {formatCLP(price)}
                        </div>
                        <span className="inline-block text-[10px] font-extrabold text-[#349673]">
                          ✓ En stock Punta Arenas
                        </span>

                        <button
                          type="button"
                          onClick={() => handleQuickAddGift(p)}
                          className="w-full mt-1.5 py-1.5 px-3 rounded-full bg-[#fa795f] hover:bg-[#e7694f] text-white font-display font-bold text-[11px] shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>¡Empacado!</span>
                            </>
                          ) : (
                            <>
                              <HugeiconsIcon icon={GiftIcon} size={14} strokeWidth={2} />
                              <span>Llevar empacado</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Pie del Modal */}
            <div className="p-4 sm:p-5 bg-[#faf5ee] border-t-2 border-[#f0dfd2] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#73637c]">
                📦 Entrega rápida en Punta Arenas • Moño y tarjeta 100% gratis
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    scrollToRecommendations()
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white border-2 border-[#e3d1c1] hover:border-[#fa795f] text-xs font-bold text-[#4b347d] transition-all cursor-pointer"
                >
                  Ver también en la página ↓
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#fa795f] hover:bg-[#e7694f] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Entendido ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
