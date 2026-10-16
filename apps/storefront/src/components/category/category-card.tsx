import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "@/components/ui/icons"

export interface CategoryCardProps {
  name: string
  handle: string
  description?: string
  imageUrl?: string
  productCount?: number
  accentColor?: string
}

export function CategoryCard({
  name,
  handle,
  description,
  imageUrl,
  productCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categoria/${handle}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-white border border-[#efeae5] shadow-sm hover:shadow-lg hover:border-[#4b347d]/40 transition-all duration-300 p-6 sm:p-7 min-h-[220px]"
    >
      {/* Fondo decorativo con imagen o gradiente suave */}
      {imageUrl ? (
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#f8f4ff] via-white to-[#fffaf1] opacity-70" />
      )}

      {/* Contenido Superior */}
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#ecf19f] text-[#4b347d]">
          <span>✦</span>
          <span>{productCount !== undefined ? `${productCount} juegos` : "Colección"}</span>
        </span>
        <h3 className="font-display font-semibold text-2xl text-[#2d2943] mt-3 group-hover:text-[#4b347d] transition-colors leading-snug tracking-[-0.03em]">
          {name}
        </h3>
        {description && (
          <p className="text-xs text-[#7b7180] font-medium mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Enlace Inferior con flecha animada */}
      <div className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-extrabold text-[#fa795f] group-hover:text-[#e7694f] group-hover:translate-x-1 transition-all">
        <span>Explorar colección</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  )
}
