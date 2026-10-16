"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight } from "@/components/ui/icons"
import { useCart } from "@/context/cart-context"
import { formatCLP } from "@/lib/format-price"
import { WhatsAppInquiryModal } from "@/components/cart/whatsapp-inquiry-modal"

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    closeCart,
    totalCLP,
    totalItems,
  } = useCart()

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#201632]/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        aria-label="Tu bolsa de juegos"
        role="dialog"
        aria-modal="true"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-[460px] bg-[#fffcf7] shadow-[-16px_0_60px_rgba(21,13,38,0.2)] flex flex-col justify-between animate-in slide-in-from-right duration-300"
      >
        {/* Header del Carrito */}
        <div className="p-6 sm:p-7 border-b border-[#e9e4df] bg-white flex items-center justify-between">
          <div>
            <h2 className="font-display font-semibold text-2xl sm:text-[1.95rem] text-[#2d2943] leading-none">
              Tu bolsa de juegos <span className="text-[#fa795f]">✳</span>
            </h2>
            <p className="text-[0.8rem] text-[#80768a] font-bold mt-1.5">
              Los buenos momentos empiezan acá.
            </p>
          </div>

          <button
            onClick={closeCart}
            type="button"
            className="w-10 h-10 rounded-full bg-[#f0eafa] hover:bg-[#e4d7f5] grid place-items-center text-[#4b347d] transition-colors"
            aria-label="Cerrar bolsa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Progreso Despacho Gratis Punta Arenas */}
        {items.length > 0 && (() => {
          const FREE_SHIPPING_GOAL = 35000
          const amountRemaining = Math.max(0, FREE_SHIPPING_GOAL - totalCLP)
          const percent = Math.min(100, Math.round((totalCLP / FREE_SHIPPING_GOAL) * 100))
          const isUnlocked = amountRemaining === 0

          return (
            <div className="bg-[#fcf8f2] border-b border-[#ece4da] px-6 py-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold">
                {isUnlocked ? (
                  <span className="text-[#2b8359] flex items-center gap-1.5">
                    <span>🎉</span> ¡Despacho Gratis en Punta Arenas Desbloqueado!
                  </span>
                ) : (
                  <span className="text-[#4b347d] flex items-center gap-1.5">
                    <span>🚚</span> Te faltan <strong className="text-[#fa795f]">{formatCLP(amountRemaining)}</strong> para Despacho Gratis en Punta Arenas
                  </span>
                )}
                <span className="text-[11px] text-[#7a6f84]">{percent}%</span>
              </div>

              {/* Barra gráfica animada */}
              <div className="w-full h-2.5 rounded-full bg-[#e9e1d8] overflow-hidden p-0.5">
                <div
                  style={{ width: `${percent}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    isUnlocked
                      ? "bg-gradient-to-r from-[#349673] to-[#25D366]"
                      : "bg-gradient-to-r from-[#ffd678] to-[#fa795f]"
                  }`}
                />
              </div>
            </div>
          )
        })()}

        {/* Lista de Ítems */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center py-12 space-y-3">
              <span className="text-5xl text-[#ffd678] font-display" aria-hidden="true">
                ☆
              </span>
              <strong className="font-display font-semibold text-2xl text-[#2d2943]">
                ¡Tu bolsa está esperando aventuras!
              </strong>
              <p className="text-xs text-[#80768a] font-semibold max-w-xs">
                Elige un juego didáctico o de mesa y comienza por aquí.
              </p>
              <button
                onClick={closeCart}
                type="button"
                className="mt-3 inline-flex items-center gap-2 bg-[#fa795f] hover:bg-[#e26249] text-[#2d2943] px-6 py-2.5 rounded-full text-xs font-extrabold shadow-sm transition-all"
              >
                Explorar juguetes
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="grid grid-cols-[80px_1fr_auto] gap-3.5 items-center border-b border-[#e9e4df] py-4 bg-white/70 p-3 rounded-2xl"
              >
                {/* Thumbnail Circular Medallón */}
                <div className="w-[74px] h-[74px] rounded-full border-2 border-white shadow-sm bg-[#f3e9ff] grid place-items-center overflow-hidden shrink-0 relative">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="78px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-2xl">🎲</span>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <Link
                    href={`/producto/${item.handle}`}
                    onClick={closeCart}
                    className="font-display font-semibold text-[1rem] leading-tight text-[#2d2943] hover:text-[#4b347d] truncate block"
                  >
                    {item.title}
                  </Link>

                  <small className="block font-extrabold text-[0.76rem] text-[#827787] mt-1 mb-2">
                    {item.variantTitle || "Juego didáctico"}
                  </small>

                  {/* Cantidad */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      type="button"
                      className="w-7 h-7 rounded-full border border-[#e4dce4] bg-white text-[#2d2943] font-bold text-sm grid place-items-center hover:bg-[#f0eafa] transition-colors"
                      aria-label="Quitar una unidad"
                    >
                      −
                    </button>
                    <span className="text-xs font-extrabold text-[#2d2943] min-w-[14px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      type="button"
                      className="w-7 h-7 rounded-full border border-[#e4dce4] bg-white text-[#2d2943] font-bold text-sm grid place-items-center hover:bg-[#f0eafa] transition-colors"
                      aria-label="Agregar una unidad"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.variantId)}
                      type="button"
                      className="ml-2 text-[#827787] hover:text-[#fa795f] p-1"
                      aria-label={`Eliminar ${item.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Precio Total Ítem */}
                <div className="font-extrabold text-sm text-[#2d2943] text-right">
                  {formatCLP(item.priceCLP * item.quantity)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer del Carrito */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#e9e4df] space-y-4">
            <div className="flex items-center justify-between font-display font-bold text-[1.32rem] text-[#2d2943]">
              <span>Subtotal estimado</span>
              <strong className="text-2xl text-[#4b347d]">
                {formatCLP(totalCLP)}
              </strong>
            </div>

            <button
              onClick={() => setInquiryModalOpen(true)}
              type="button"
              className="w-full flex items-center justify-center gap-2.5 bg-[#4b347d] hover:bg-[#392559] text-white py-4 px-6 rounded-full font-extrabold text-[0.93rem] shadow-[0_7px_0_#3925591a] hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-[#ffd678]" />
              <span>Consultar pedido por WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <p className="text-[0.69rem] font-semibold text-[#817986] text-center leading-relaxed">
              Calculamos precios vigentes en pesos chilenos (CLP). El stock y despacho se coordinan directamente en la conversación.
            </p>

            <button
              onClick={clearCart}
              type="button"
              className="w-full text-center text-xs text-[#827787] hover:text-[#fa795f] transition-colors pt-1"
            >
              Vaciar bolsa
            </button>
          </div>
        )}
      </aside>

      {/* Modal de Solicitud de Pedido WhatsApp */}
      <WhatsAppInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </>
  )
}
