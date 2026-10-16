"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Plus,
  Minus,
  Check,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  Share2,
  ChevronRight,
  Info,
} from "@/components/ui/icons"
import { formatCLP } from "@/lib/format-price"
import { useCart } from "@/context/cart-context"
import { ProductCard } from "@/components/product/product-card"
import { getProductSkillChips } from "@/lib/didactic-skills"
import type { MedusaProduct, MedusaProductVariant } from "@/lib/medusa"

interface ProductDetailViewProps {
  product: MedusaProduct
  relatedProducts: MedusaProduct[]
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addItem, openCart } = useCart()

  // Estado de variante seleccionada
  const [selectedVariant, setSelectedVariant] = useState<MedusaProductVariant>(
    product.variants?.[0] || ({} as MedusaProductVariant)
  )
  const [selectedImage, setSelectedImage] = useState<string>(
    product.thumbnail || product.images?.[0]?.url || ""
  )
  const [imageError, setImageError] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [comboAddedFeedback, setComboAddedFeedback] = useState(false)
  const [includeCompanion, setIncludeCompanion] = useState(true)

  // Countdown timer para despacho hoy en Punta Arenas
  const [timeLeft, setTimeLeft] = useState({ hours: "03", minutes: "45", seconds: "20" })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      // Objetivo: 16:00 hrs de hoy en Punta Arenas (UTC-3)
      const target = new Date()
      target.setHours(16, 0, 0, 0)
      if (now > target) {
        target.setDate(target.getDate() + 1)
      }
      const diff = Math.max(0, target.getTime() - now.getTime())
      const h = Math.floor(diff / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      })
    }
    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Precio calculado de la variante seleccionada en CLP
  const currentPriceCLP =
    selectedVariant?.calculated_price?.calculated_amount ?? 0
  const category = product.categories?.[0]

  // Producto acompañante para el Bundle "Comprados Juntos"
  const companion = relatedProducts?.[0]
  const companionVariant = companion?.variants?.[0]
  const companionPriceCLP = companionVariant?.calculated_price?.calculated_amount ?? 0
  const normalBundleTotal = currentPriceCLP + (includeCompanion ? companionPriceCLP : 0)
  const bundleDiscount = includeCompanion && companion ? Math.round(normalBundleTotal * 0.1) : 0
  const finalBundlePrice = normalBundleTotal - bundleDiscount

  const handleAddToCart = () => {
    if (!selectedVariant) return

    addItem(
      {
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        variantTitle:
          selectedVariant.title !== "Default Variant"
            ? selectedVariant.title
            : undefined,
        handle: product.handle,
        priceCLP: currentPriceCLP,
        thumbnail: product.thumbnail,
      },
      quantity
    )

    setAddedFeedback(true)
    setTimeout(() => {
      setAddedFeedback(false)
      openCart()
    }, 800)
  }

  const handleAddBundleToCart = () => {
    if (!selectedVariant) return

    // Agregar producto principal
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      variantTitle:
        selectedVariant.title !== "Default Variant"
          ? selectedVariant.title
          : undefined,
      handle: product.handle,
      priceCLP: currentPriceCLP,
      thumbnail: product.thumbnail,
    })

    // Si está marcado el acompañante, agregarlo
    if (includeCompanion && companion && companionVariant) {
      addItem({
        productId: companion.id,
        variantId: companionVariant.id,
        title: `${companion.title} (Pack Ahorro 10% desc.)`,
        variantTitle: companionVariant.title !== "Default Variant" ? companionVariant.title : undefined,
        handle: companion.handle,
        priceCLP: Math.round(companionPriceCLP * 0.9),
        thumbnail: companion.thumbnail,
      })
    }

    setComboAddedFeedback(true)
    setTimeout(() => {
      setComboAddedFeedback(false)
      openCart()
    }, 800)
  }

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: product.title,
        url: window.location.href,
      })
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert("¡Enlace copiado al portapapeles!")
    }
  }

  return (
    <div className="space-y-16">
      {/* 1. SECCIÓN PRINCIPAL DE PRODUCTO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Galería de Imágenes (Columna Izquierda) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#f8f4ff] via-[#fffdf9] to-[#faeee7] border border-[#efeae5] shadow-sm flex items-center justify-center p-8 group select-none">
            {/* Sticker Volante Exclusivo Punta Arenas */}
            <span className="absolute top-4 left-4 z-20 -rotate-3 bg-[#ffd678] text-[#4b347d] text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex items-center gap-1.5">
              <span>🐧</span> Stock Local Punta Arenas
            </span>

            {/* Sticker de Enfoque Didáctico */}
            <span className="absolute top-4 right-4 z-20 rotate-2 bg-white/90 backdrop-blur-sm text-[#fa795f] text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-sm border border-[#fa795f]/20">
              🌿 100% Sin Pantallas
            </span>

            {selectedImage && !imageError ? (
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-white/70 rounded-3xl border border-[#efeae5]">
                <span className="text-6xl mb-3">🎲</span>
                <span className="font-display font-bold text-lg text-[#4b347d]">
                  {product.title}
                </span>
                <span className="text-xs text-[#8a8190] mt-1">
                  Curaduría didáctica Lúdicamente
                </span>
              </div>
            )}
          </div>

          {/* Carrusel de Miniaturas (si tiene más de 1 imagen) */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => {
                const isSelected = selectedImage === img.url
                return (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => {
                      setSelectedImage(img.url)
                      setImageError(false)
                    }}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white p-2 ${
                      isSelected
                        ? "border-[#fa795f] shadow-md scale-105"
                        : "border-[#efeae5] hover:border-[#4b347d]/40 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.title} miniatura ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Ficha Informativa y Acciones (Columna Derecha) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Breadcrumbs y Compartir */}
          <div className="flex items-center justify-between text-xs font-bold text-[#8a8190]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href="/catalogo" className="hover:text-[#4b347d]">
                Catálogo
              </Link>
              <ChevronRight className="w-3 h-3 text-[#c4bccb]" />
              {category && (
                <>
                  <Link
                    href={`/categoria/${category.handle}`}
                    className="hover:text-[#4b347d]"
                  >
                    {category.name}
                  </Link>
                  <ChevronRight className="w-3 h-3 text-[#c4bccb]" />
                </>
              )}
              <span className="text-[#4b347d] truncate max-w-[140px]">
                {product.title}
              </span>
            </div>

            <button
              onClick={handleShare}
              type="button"
              className="p-2 rounded-full hover:bg-white text-[#776d7f] hover:text-[#4b347d] transition-colors"
              aria-label="Compartir este producto"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Título y Subtítulo */}
          <div className="space-y-2">
            <h1 className="font-display font-semibold text-2xl sm:text-4xl text-[#2d2943] tracking-[-0.038em] leading-tight">
              {product.title}
            </h1>
            {product.subtitle && (
              <p className="text-sm font-semibold text-[#8a8190] leading-relaxed">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Chips de Habilidades Pedagógicas Dinámicas de Medusa */}
          {(() => {
            const skillChips = getProductSkillChips(product.tags, category?.name)
            return (
              <div className="flex flex-wrap gap-2 pt-1">
                {skillChips.map((chip) => (
                  <span
                    key={chip.id}
                    style={{
                      backgroundColor: chip.bg,
                      color: chip.text,
                      borderColor: chip.border,
                    }}
                    className="px-3 py-1 rounded-full text-[11px] font-extrabold border shadow-sm transition-transform hover:scale-105 select-none"
                  >
                    {chip.icon} {chip.label}
                  </span>
                ))}
              </div>
            )
          })()}

          {/* Precio Prominente en CLP */}
          <div className="p-5 rounded-[22px] bg-[#fffaf1] border border-[#f0eae2] flex items-center justify-between shadow-sm">
            <div className="space-y-0.5">
              <span className="text-[11px] font-extrabold text-[#95899a] uppercase tracking-wider">
                Valor Referencial
              </span>
              <div className="font-display font-bold text-3xl sm:text-4xl text-[#4b347d] tracking-[-0.04em]">
                {formatCLP(currentPriceCLP)}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ecf19f] text-[#4b347d]">
              CLP Oficial
            </span>
          </div>

          {/* Reloj Cuenta Atrás para Despacho Hoy en Punta Arenas */}
          <div className="bg-[#fff4ed] border border-[#fcd5c3] rounded-2xl p-3.5 flex items-center justify-between text-xs font-bold text-[#8c3b28]">
            <div className="flex items-center gap-2">
              <span className="text-lg animate-pulse">⏰</span>
              <div>
                <span className="block font-display font-bold text-[#2d2943]">
                  Pide hoy para retiro o entrega en Punta Arenas
                </span>
                <span className="block text-[11px] text-[#7a6f84] font-medium">
                  Despachos y entregas del día coordinadas
                </span>
              </div>
            </div>
            <div className="font-mono bg-[#fa795f] text-white px-2.5 py-1.5 rounded-xl text-xs font-extrabold tracking-widest shadow-sm">
              {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </div>
          </div>

          {/* Selector de Variantes Reales de Medusa */}
          {product.variants && product.variants.length > 1 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-extrabold text-[#2d2943] uppercase tracking-wider">
                Selecciona versión o formato:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id
                  const variantPrice =
                    v.calculated_price?.calculated_amount ?? 0

                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-[#4b347d] bg-[#f3edfb] font-bold text-[#4b347d] ring-1 ring-[#4b347d]"
                          : "border-[#efeae5] bg-white text-[#2d2943] hover:border-[#4b347d]/40"
                      }`}
                    >
                      <span className="text-xs font-bold">{v.title}</span>
                      <span className="text-xs font-extrabold text-[#4b347d]">
                        {formatCLP(variantPrice)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Selector de Cantidad y Botón de Acción */}
          <div className="space-y-3.5 pt-1">
            <div className="flex items-center gap-3">
              {/* Contador */}
              <div className="flex items-center border border-[#efeae5] rounded-full overflow-hidden bg-[#fffaf1]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#2d2943] hover:bg-[#efe8e1] transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-display font-bold text-sm text-[#2d2943] min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#2d2943] hover:bg-[#efe8e1] transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Botón Principal Coral Lúdico */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2.5 bg-[#fa795f] hover:bg-[#e7694f] text-white py-3.5 px-5 rounded-full font-display font-bold text-sm shadow-[0_12px_24px_-8px_rgba(250,121,95,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>¡Agregado a tu bolsa! ✳</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    <span>Consultar por WhatsApp</span>
                  </>
                )}
              </button>
            </div>

            {/* Aviso de Transparencia Humana y Retiro Local */}
            <div className="p-3.5 rounded-2xl bg-[#e8dcff]/30 border border-[#e8dcff] text-xs text-[#5f516a] flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-[#4b347d] shrink-0 mt-0.5" />
              <span>
                Al agregar este juego se preparará una cotización sin pago previo para validar stock físico real en <strong>Punta Arenas</strong> y coordinar retiro o entrega vía WhatsApp.
              </span>
            </div>
          </div>

          {/* Sellos Pedagógicos y de Confianza Lúdicamente */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <div className="bg-white border border-[#efeae5] rounded-2xl p-3 flex items-start gap-2.5 shadow-sm">
              <span className="text-xl">📍</span>
              <div>
                <strong className="block font-display font-bold text-xs text-[#2d2943]">
                  Stock Punta Arenas
                </strong>
                <span className="block text-[11px] text-[#786e81] leading-tight">
                  Retiro local o despacho express hoy
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#efeae5] rounded-2xl p-3 flex items-start gap-2.5 shadow-sm">
              <span className="text-xl">🪵</span>
              <div>
                <strong className="block font-display font-bold text-xs text-[#2d2943]">
                  Madera Sustentable
                </strong>
                <span className="block text-[11px] text-[#786e81] leading-tight">
                  Material noble certificado FSC®
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#efeae5] rounded-2xl p-3 flex items-start gap-2.5 shadow-sm">
              <span className="text-xl">🌿</span>
              <div>
                <strong className="block font-display font-bold text-xs text-[#2d2943]">
                  Libre de Tóxicos
                </strong>
                <span className="block text-[11px] text-[#786e81] leading-tight">
                  Pintura base agua segura al tacto
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#efeae5] rounded-2xl p-3 flex items-start gap-2.5 shadow-sm">
              <span className="text-xl">🧠</span>
              <div>
                <strong className="block font-display font-bold text-xs text-[#2d2943]">
                  Método Montessori
                </strong>
                <span className="block text-[11px] text-[#786e81] leading-tight">
                  Fomenta autonomía y calma
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPRADOS JUNTOS HABITUALMENTE (BUNDLE & CROSS-SELLING) */}
      {companion && (
        <section className="bg-gradient-to-br from-[#fffdfa] via-[#fff8f0] to-[#f5f0fc] border border-[#ebdcd0] rounded-[32px] p-6 sm:p-9 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0e3d5] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#fa795f] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#fa795f]" />
                <span>COMBO AHORRO LÚDICAMENTE</span>
              </div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#2d2943] tracking-[-0.03em] mt-1">
                Comprados juntos habitualmente en Punta Arenas ✳
              </h2>
            </div>
            {bundleDiscount > 0 && (
              <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#ecf19f] text-[#4b347d] text-xs font-extrabold shadow-sm">
                Ahorras {formatCLP(bundleDiscount)} llevando el set
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visualización de los 2 productos enlazados */}
            <div className="md:col-span-7 flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
              {/* Producto A (Actual) */}
              <div className="flex-1 bg-white border border-[#efeae5] rounded-2xl p-3 flex items-center gap-3 shadow-sm min-w-[200px]">
                <div className="w-16 h-16 rounded-full border-2 border-white shadow-sm bg-[#f8f4ff] relative overflow-hidden shrink-0">
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid place-items-center h-full text-2xl">🎲</span>
                  )}
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[11px] font-extrabold text-[#fa795f] uppercase">
                    Este producto
                  </span>
                  <span className="block font-display font-bold text-xs text-[#2d2943] truncate">
                    {product.title}
                  </span>
                  <span className="block text-xs font-extrabold text-[#4b347d] mt-0.5">
                    {formatCLP(currentPriceCLP)}
                  </span>
                </div>
              </div>

              {/* Signo Más */}
              <div className="w-8 h-8 rounded-full bg-[#ffd678] text-[#4b347d] font-bold text-lg grid place-items-center shrink-0 shadow-sm">
                +
              </div>

              {/* Producto B (Complementario) */}
              <div className="flex-1 bg-white border border-[#efeae5] rounded-2xl p-3 flex items-center gap-3 shadow-sm min-w-[200px]">
                <div className="w-16 h-16 rounded-full border-2 border-white shadow-sm bg-[#ffdfcf] relative overflow-hidden shrink-0">
                  {companion.thumbnail ? (
                    <Image
                      src={companion.thumbnail}
                      alt={companion.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid place-items-center h-full text-2xl">🧩</span>
                  )}
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[11px] font-extrabold text-[#349673] uppercase">
                    Complemento ideal
                  </span>
                  <span className="block font-display font-bold text-xs text-[#2d2943] truncate">
                    {companion.title}
                  </span>
                  <span className="block text-xs font-extrabold text-[#4b347d] mt-0.5">
                    {formatCLP(companionPriceCLP)}
                  </span>
                </div>
              </div>
            </div>

            {/* Caja de Checkout del Combo */}
            <div className="md:col-span-5 bg-white border border-[#e8dfd5] rounded-2xl p-5 shadow-sm space-y-3.5">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-[#4a4153]">
                <input
                  type="checkbox"
                  checked={includeCompanion}
                  onChange={(e) => setIncludeCompanion(e.target.checked)}
                  className="w-4 h-4 rounded text-[#fa795f] focus:ring-[#fa795f] accent-[#fa795f]"
                />
                <span>Incluir {companion.title}</span>
              </label>

              <div className="flex items-baseline justify-between pt-1 border-t border-[#f2ede6]">
                <span className="text-xs text-[#80768a] font-bold">Total del pack:</span>
                <div className="text-right">
                  {bundleDiscount > 0 && (
                    <span className="text-xs line-through text-[#9d93a6] mr-2">
                      {formatCLP(normalBundleTotal)}
                    </span>
                  )}
                  <span className="font-display font-bold text-xl sm:text-2xl text-[#4b347d]">
                    {formatCLP(finalBundlePrice)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full py-3 px-4 rounded-full bg-[#fa795f] hover:bg-[#e7694f] text-white font-display font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                {comboAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>¡Pack agregado a la bolsa! 🎉</span>
                  </>
                ) : (
                  <>
                    <span>🛒</span>
                    <span>Agregar combo completo a la bolsa</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. DESCRIPCIÓN DETALLADA DEL PRODUCTO */}
      <section className="bg-white border border-[#efeae5] rounded-[32px] p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#ffd678]" />
          <span>PROPUESTA DIDÁCTICA & DETALLES</span>
        </div>
        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#2d2943] tracking-[-0.03em]">
          ¿Por qué elegimos este juego? ✦
        </h2>
        <div className="text-[#645c6b] text-sm sm:text-base font-medium leading-relaxed space-y-3">
          {product.description ? (
            <p className="whitespace-pre-line">
              {product.description}
            </p>
          ) : (
            <p className="italic text-[#8a8190]">
              Este producto forma parte de la curaduría lúdica de Lúdicamente Punta Arenas. Consulta detalles de componentes, dinámicas y edad recomendada con nuestros especialistas por WhatsApp.
            </p>
          )}
        </div>
      </section>

      {/* 4. PRODUCTOS RELACIONADOS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#ecf19f]" />
                <span>SIGUE DESCUBRIENDO</span>
              </div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#2d2943] tracking-[-0.03em]">
                También te podría encantar ✳
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="text-xs font-bold text-[#4b347d] hover:text-[#fa795f] transition-colors hover:underline"
            >
              Ver catálogo completo →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
