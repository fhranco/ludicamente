"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Check, Heart } from "@/components/ui/icons"
import { formatCLP } from "@/lib/format-price"
import { useCart } from "@/context/cart-context"
import { getProductSkillChips } from "@/lib/didactic-skills"
import { PlayfulChildrenMask } from "@/components/common/playful-children-mask"
import type { MedusaProduct } from "@/lib/medusa"

interface ProductCardProps {
  product: MedusaProduct
  index?: number
  onQuickView?: (product: MedusaProduct) => void
}

const PASTEL_BG = [
  "#f3e9ff",
  "#ffdfcf",
  "#dcf3e5",
  "#fff0bd",
  "#ffdfe6",
  "#e3e9ff",
  "#d8f1e0",
  "#fce4ce",
]

export function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const { addItem, items } = useCart()
  const [isFavorited, setIsFavorited] = useState(false)

  const variant = product.variants?.[0]
  const priceCLP = variant?.calculated_price?.calculated_amount ?? 0
  const categoryName = product.categories?.[0]?.name || "Didáctico"
  const isAlreadyInCart = items.some((i) => i.productId === product.id)
  const bg = PASTEL_BG[index % PASTEL_BG.length]

  // Badges y stickers volantes dinámicos con temática lúdica y austral
  const BADGES = [
    { label: "Favorito Magallanes 🐧", bg: "#ffd678", text: "#4b347d", rotate: "-rotate-2" },
    { label: "100% Sin Pantallas 🌿", bg: "#dcf3e5", text: "#1b6b47", rotate: "rotate-1" },
    { label: "Madera Natural 🪵", bg: "#ffdfcf", text: "#a3451e", rotate: "-rotate-1" },
    { label: "Método Montessori 🧠", bg: "#f3e9ff", text: "#4b347d", rotate: "rotate-2" },
    { label: "Éxito en Cumpleaños 🎂", bg: "#ffdfe6", text: "#96233a", rotate: "-rotate-2" },
    { label: "Juego en Familia 🤝", bg: "#fff0bd", text: "#7a5806", rotate: "rotate-1" },
  ]
  const skillChips = product.tags?.length ? getProductSkillChips(product.tags) : null
  const badge = skillChips?.[0]
    ? {
        label: `${skillChips[0].icon} ${skillChips[0].label}`,
        bg: skillChips[0].bg,
        text: skillChips[0].text,
        rotate: index % 2 === 0 ? "-rotate-2" : "rotate-1",
      }
    : BADGES[index % BADGES.length]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!variant) return

    addItem({
      productId: product.id,
      variantId: variant.id,
      title: product.title,
      variantTitle: variant.title !== "Default Variant" ? variant.title : undefined,
      handle: product.handle,
      priceCLP: priceCLP,
      thumbnail: product.thumbnail,
    })
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(!isFavorited)
  }

  return (
    <article className="group bg-[#fffcf7] border border-[#efeae5] rounded-[30px_18px_32px_18px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(64,48,91,0.12)] relative">
      {/* Media Box con Fondo Pastel y Siluetas Orgánicas Infantiles */}
      <div
        style={{ backgroundColor: bg }}
        className="relative aspect-[1/0.95] w-full grid place-items-center overflow-hidden select-none"
      >
        {/* Tag Pill Volante Estilo Sticker */}
        <span
          style={{ backgroundColor: badge.bg, color: badge.text }}
          className={`absolute z-30 left-3.5 top-3.5 px-3 py-1.5 rounded-full text-[0.68rem] font-extrabold shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${badge.rotate} transition-transform group-hover:rotate-0`}
        >
          {badge.label}
        </span>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          type="button"
          aria-label={isFavorited ? "Quitar de favoritos" : "Guardar en favoritos"}
          className={`absolute z-30 right-3.5 top-3.5 w-9 h-9 rounded-full bg-white grid place-items-center shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-transform active:scale-90 ${
            isFavorited ? "text-[#fa795f]" : "text-[#77727d] hover:text-[#fa795f]"
          }`}
        >
          <Heart className={`w-4.5 h-4.5 ${isFavorited ? "fill-current" : ""}`} />
        </button>

        {/* Destellos lúdicos flotantes que acompañan la forma orgánica */}
        <span className="absolute bottom-3 left-3 text-xs opacity-40 group-hover:opacity-85 group-hover:scale-125 transition-all text-[#4b347d] pointer-events-none">
          ✦
        </span>
        <span className="absolute top-12 right-3 text-[11px] opacity-35 group-hover:opacity-85 group-hover:-rotate-12 transition-all text-[#fa795f] pointer-events-none">
          ✳
        </span>

        {/* Imagen del Producto en Máscara Irregular Infantil Específica (Nube, Flor, Puzzle, Osito, Estrella, Sello) */}
        <Link
          href={`/producto/${product.handle}`}
          className="w-full h-full relative grid place-items-center p-2 z-10"
        >
          <PlayfulChildrenMask
            src={product.thumbnail}
            alt={product.title}
            shapeIndex={index}
          />
        </Link>
      </div>

      {/* Info del Producto */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-[0.7rem] font-extrabold tracking-[0.02em] text-[#807784]">
            <span className="text-[#4b347d] uppercase">{categoryName}</span>
            <span className="text-[#807784]">DESDE 3+ AÑOS</span>
          </div>

          <h3 className="font-display font-semibold text-[1.18rem] sm:text-[1.24rem] leading-[1.2] text-[#2d2943] mt-2 mb-1">
            <Link
              href={`/producto/${product.handle}`}
              className="hover:underline hover:decoration-[#fa795f] hover:underline-offset-4 transition-all"
            >
              {product.title}
            </Link>
          </h3>
        </div>

        {/* Precio y Botón Agregar */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#f0eae2]">
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-[1.2rem] text-[#2d2943]">
              {formatCLP(priceCLP)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            type="button"
            className={`w-11 h-11 rounded-[15px] grid place-items-center transition-all duration-200 active:scale-95 shadow-sm ${
              isAlreadyInCart
                ? "bg-[#d8f2df] text-[#4b347d]"
                : "bg-[#4b347d] hover:bg-[#fa795f] text-white hover:text-[#2d2943] hover:rotate-6"
            }`}
            aria-label={`Agregar ${product.title} a la bolsa`}
          >
            {isAlreadyInCart ? (
              <Check className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
