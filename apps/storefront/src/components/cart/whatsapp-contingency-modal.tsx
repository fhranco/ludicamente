"use client"

import React, { useState } from "react"
import { Copy, Check, ExternalLink, X, MessageCircle } from "@/components/ui/icons"

interface WhatsAppContingencyModalProps {
  isOpen: boolean
  onClose: () => void
  messageText: string
  whatsappUrl: string
  inquiryCode: string
}

export function WhatsAppContingencyModal({
  isOpen,
  onClose,
  messageText,
  whatsappUrl,
  inquiryCode,
}: WhatsAppContingencyModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E8DDCF] shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Encabezado Modal */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-[#263640]">
                Tu consulta está lista
              </h3>
              <p className="text-xs text-[#5A6B75] mt-0.5">
                Código de seguimiento: <span className="font-bold text-[#137D84]">{inquiryCode}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="text-[#5A6B75] hover:text-[#263640] p-1.5 rounded-xl hover:bg-[#F4ECE1] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explicación amigable */}
        <p className="text-sm text-[#5A6B75] leading-relaxed">
          Si la ventana de WhatsApp no se abrió automáticamente en tu navegador o dispositivo móvil, puedes copiar el texto preparado y abrir la conversación directamente:
        </p>

        {/* Vista previa del mensaje */}
        <div className="bg-[#FFF9F0] border border-[#E8DDCF] rounded-2xl p-4 max-h-48 overflow-y-auto text-xs text-[#263640] font-mono whitespace-pre-wrap leading-relaxed">
          {messageText}
        </div>

        {/* Acciones accesibles */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleCopy}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#137D84] hover:bg-[#0E6167] text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>¡Mensaje Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Mensaje</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Reintentar Abrir</span>
          </a>
        </div>

        <p className="text-center text-xs text-[#5A6B75]/80">
          WhatsApp Oficial: <span className="font-semibold text-[#263640]">+56 9 1234 5678</span>
        </p>
      </div>
    </div>
  )
}
