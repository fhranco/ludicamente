"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle, X } from "@/components/ui/icons"

interface FloatingWhatsAppProps {
  phone?: string
}

export function FloatingWhatsApp({ phone = "+56912345678" }: FloatingWhatsAppProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const cleanPhone = phone.replace(/[^0-9]/g, "")

  // Auto mostrar speech bubble tras 7 segundos de navegación si no se ha interactuado
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true)
      }
    }, 7000)
    return () => clearTimeout(timer)
  }, [hasInteracted])

  const isProductPage = pathname?.startsWith("/producto/")

  const getCustomMessage = (presetQuery?: string) => {
    let msg = `¡Hola Lúdicamente! 👋 Les escribo desde Punta Arenas.`
    if (presetQuery) {
      msg += ` ${presetQuery}`
    } else if (isProductPage) {
      msg += ` Estoy viendo este juego en su tienda online y me gustaría consultar disponibilidad para entrega o retiro local.`
    } else {
      msg += ` Me gustaría consultar por opciones de juegos didácticos y despacho en Punta Arenas / Magallanes.`
    }
    return encodeURIComponent(msg)
  }

  const handleOpenWhatsApp = (presetQuery?: string) => {
    setHasInteracted(true)
    const url = `https://wa.me/${cleanPhone}?text=${getCustomMessage(presetQuery)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end select-none">
      {/* Speech Bubble / Mini Popover */}
      {isOpen && (
        <div className="mb-3 w-[290px] sm:w-[320px] bg-[#fffdfa] rounded-[24px] p-4 border border-[#e8dfd5] shadow-[0_20px_45px_rgba(45,29,77,0.18)] animate-in fade-in slide-in-from-bottom-3 duration-300 relative">
          {/* Botón cerrar burbuja */}
          <button
            onClick={() => {
              setIsOpen(false)
              setHasInteracted(true)
            }}
            aria-label="Cerrar mensaje"
            className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-[#f2ecf8] hover:bg-[#e4d8f0] grid place-items-center text-[#4b347d] text-xs transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Encabezado Asesor Lúdico */}
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#f0eae1]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] grid place-items-center text-white shadow-sm font-bold text-sm">
              🐧
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xs text-[#2d2943]">
                  Lúdicamente Punta Arenas
                </span>
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <p className="text-[0.66rem] font-bold text-[#349673]">
                Atención local activa en Magallanes
              </p>
            </div>
          </div>

          {/* Cuerpo del mensaje */}
          <div className="py-2.5 text-[0.8rem] font-medium text-[#4a4254] leading-relaxed">
            {isProductPage ? (
              <p>
                ¿Tienes dudas con este juego? Te confirmamos stock inmediato en{" "}
                <strong className="text-[#4b347d]">Punta Arenas</strong> y opciones de retiro en el día. ✨
              </p>
            ) : (
              <p>
                ¡Hola! 👋 Te ayudamos a elegir el juego didáctico perfecto según la edad y coordinar retiro o entrega en{" "}
                <strong className="text-[#4b347d]">Punta Arenas</strong>.
              </p>
            )}
          </div>

          {/* Botones de acción rápida */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => handleOpenWhatsApp("¿Dónde se puede retirar en Punta Arenas?")}
              className="w-full text-left px-3 py-1.5 rounded-xl bg-[#f6f2fb] hover:bg-[#ebdef7] text-[0.74rem] font-bold text-[#4b347d] transition-colors flex items-center justify-between group"
            >
              <span>📍 ¿Dónde se retira en Punta Arenas?</span>
              <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
            <button
              onClick={() => handleOpenWhatsApp("Busco un regalo para cumpleaños. ¿Qué me recomiendan?")}
              className="w-full text-left px-3 py-1.5 rounded-xl bg-[#fff2ec] hover:bg-[#fedecd] text-[0.74rem] font-bold text-[#fa795f] transition-colors flex items-center justify-between group"
            >
              <span>🎁 ¿Qué juego recomiendan por edad?</span>
              <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

          {/* Botón principal abrir chat */}
          <button
            onClick={() => handleOpenWhatsApp()}
            className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-display font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chatear por WhatsApp ahora</span>
          </button>
        </div>
      )}

      {/* Botón Flotante Redondo */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen)
          setHasInteracted(true)
        }}
        aria-label="Abrir asesor de WhatsApp Lúdicamente"
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white grid place-items-center shadow-[0_12px_28px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        {/* Onda expansiva animada */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current transition-transform group-hover:rotate-6" />

        {/* Badge lateral "Punta Arenas" en pantallas grandes */}
        <span className="hidden sm:inline-flex absolute right-full mr-3.5 bg-[#2d2943] text-white text-[0.72rem] font-extrabold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          Punta Arenas ❄️
        </span>
      </button>
    </div>
  )
}
