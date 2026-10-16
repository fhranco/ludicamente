"use client"

import React, { useState } from "react"
import {
  X,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  RefreshCw,
} from "@/components/ui/icons"
import { useCart } from "@/context/cart-context"
import { formatCLP } from "@/lib/format-price"

interface WhatsAppInquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WhatsAppInquiryModal({
  isOpen,
  onClose,
}: WhatsAppInquiryModalProps) {
  const { items, totalCLP, clearCart } = useCart()

  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [deliveryPreference, setDeliveryPreference] = useState<
    "retiro" | "despacho_por_coordinar"
  >("despacho_por_coordinar")
  const [customerNotes, setCustomerNotes] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [inquiryResult, setInquiryResult] = useState<{
    reference_code: string
    whatsapp_url: string
    fallback_text: string
    summary: {
      total_clp: number
      items_count: number
    }
  } | null>(null)
  const [copied, setCopied] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!isOpen) return null

  const defaultPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+56912345678"
  const cleanPhone = defaultPhone.replace(/\+/g, "").replace(/\s+/g, "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName.trim()) {
      setErrorMessage("Por favor ingresa tu nombre para dirigirnos a ti.")
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    const idempotencyKey = `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

      const payload = {
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim() || undefined,
        delivery_preference: deliveryPreference,
        customer_notes: customerNotes.trim() || undefined,
        idempotency_key: idempotencyKey,
        items: items.map((i) => ({
          variant_id: i.variantId,
          product_id: i.productId,
          title: i.title,
          variant_title: i.variantTitle,
          quantity: i.quantity,
          // Nótese: El backend de Medusa ignorará los precios enviados por el cliente y recalculará server-side
        })),
      }

      const res = await fetch(`${backendUrl}/store/whatsapp-inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const data = await res.json()
        setInquiryResult(data)
        // Intentar abrir WhatsApp en nueva pestaña
        window.open(data.whatsapp_url, "_blank", "noopener,noreferrer")
      } else {
        // Fallback local robusto si el endpoint backend está en migración
        const reference = `LUD-${Date.now().toString().slice(-6)}`
        const deliveryText =
          deliveryPreference === "retiro"
            ? "Retiro en tienda (por coordinar)"
            : "Despacho a coordinar"

        let text = `👋 ¡Hola Lúdicamente! Mi nombre es *${customerName.trim()}*.\n\n`
        text += `Deseo consultar por la disponibilidad de la siguiente solicitud (*${reference}*):\n\n`

        items.forEach((item, idx) => {
          text += `${idx + 1}. *${item.title}* ${
            item.variantTitle ? `(${item.variantTitle})` : ""
          } x ${item.quantity} ud. — Ref: ${formatCLP(
            item.priceCLP * item.quantity
          )}\n`
        })

        text += `\n💰 *Subtotal Estimado:* ${formatCLP(totalCLP)}\n`
        text += `📦 *Preferencia de entrega:* ${deliveryText}\n`

        if (customerNotes.trim()) {
          text += `📝 *Observaciones:* ${customerNotes.trim()}\n`
        }

        text += `\n_Quedo atento/a para confirmar stock y coordinar. ¡Muchas gracias!_`

        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
          text
        )}`

        const localResult = {
          reference_code: reference,
          whatsapp_url: whatsappUrl,
          fallback_text: text,
          summary: {
            total_clp: totalCLP,
            items_count: items.length,
          },
        }

        setInquiryResult(localResult)
        window.open(whatsappUrl, "_blank", "noopener,noreferrer")
      }
    } catch {
      // Fallback local en caso de error de red
      const reference = `LUD-${Date.now().toString().slice(-6)}`
      const deliveryText =
        deliveryPreference === "retiro"
          ? "Retiro en tienda (por coordinar)"
          : "Despacho a coordinar"

      let text = `👋 ¡Hola Lúdicamente! Mi nombre es *${customerName.trim()}*.\n\n`
      text += `Deseo consultar por la disponibilidad de la siguiente solicitud (*${reference}*):\n\n`

      items.forEach((item, idx) => {
        text += `${idx + 1}. *${item.title}* ${
          item.variantTitle ? `(${item.variantTitle})` : ""
        } x ${item.quantity} ud. — Ref: ${formatCLP(
          item.priceCLP * item.quantity
        )}\n`
      })

      text += `\n💰 *Subtotal Estimado:* ${formatCLP(totalCLP)}\n`
      text += `📦 *Preferencia de entrega:* ${deliveryText}\n`

      if (customerNotes.trim()) {
        text += `📝 *Observaciones:* ${customerNotes.trim()}\n`
      }

      text += `\n_Quedo atento/a para confirmar stock y coordinar. ¡Muchas gracias!_`

      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        text
      )}`

      const localResult = {
        reference_code: reference,
        whatsapp_url: whatsappUrl,
        fallback_text: text,
        summary: {
          total_clp: totalCLP,
          items_count: items.length,
        },
      }

      setInquiryResult(localResult)
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (!inquiryResult) return
    navigator.clipboard.writeText(inquiryResult.fallback_text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleFinish = () => {
    clearCart()
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-inquiry-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263640]/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-[#FFF9F0] border border-[#E8DDCF] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="p-6 bg-white border-b border-[#E8DDCF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#137D84]/10 text-[#137D84] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-[#137D84]" />
            </div>
            <div>
              <h2
                id="modal-inquiry-title"
                className="font-extrabold text-xl text-[#263640]"
              >
                {inquiryResult ? "Solicitud Preparada" : "Consultar por WhatsApp"}
              </h2>
              <span className="text-xs text-[#5A6B75]">
                {inquiryResult
                  ? `Código: ${inquiryResult.reference_code}`
                  : "Atención humana y confirmación de disponibilidad"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 text-[#5A6B75] hover:text-[#263640] rounded-xl hover:bg-[#F4ECE1] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido Modal */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!inquiryResult ? (
            /* Formulario Previo */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#FFF9F0] border border-[#F4ECE1] p-4 rounded-xl text-xs text-[#5A6B75] space-y-1">
                <p className="font-semibold text-[#263640]">
                  ¿Cómo funciona la consulta?
                </p>
                <p>
                  Generamos un resumen estructurado de tus productos seleccionados y te abrimos WhatsApp para acordar método de despacho, stock disponible y medio de pago asistido.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nombre */}
              <div>
                <label className="block text-xs font-bold text-[#263640] mb-1.5">
                  Tu Nombre o Apellido <span className="text-[#EF745B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej: Francisca Silva"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] bg-white text-sm text-[#263640] placeholder:text-[#5A6B75]/60 focus:outline-none focus:border-[#137D84] focus:ring-2 focus:ring-[#137D84]/20 transition-all"
                />
              </div>

              {/* Teléfono Opcional */}
              <div>
                <label className="block text-xs font-bold text-[#263640] mb-1.5">
                  Teléfono de Contacto (Opcional)
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+56 9 8765 4321"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] bg-white text-sm text-[#263640] placeholder:text-[#5A6B75]/60 focus:outline-none focus:border-[#137D84] focus:ring-2 focus:ring-[#137D84]/20 transition-all"
                />
              </div>

              {/* Preferencia de Entrega */}
              <div>
                <label className="block text-xs font-bold text-[#263640] mb-1.5">
                  Preferencia de Entrega
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryPreference("despacho_por_coordinar")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryPreference === "despacho_por_coordinar"
                        ? "border-[#137D84] bg-[#137D84]/5 text-[#137D84] font-bold ring-1 ring-[#137D84]"
                        : "border-[#E8DDCF] bg-white text-[#5A6B75] hover:border-[#137D84]/40"
                    }`}
                  >
                    <span className="block text-xs">🚚 Despacho</span>
                    <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                      Punta Arenas, Magallanes o Regiones
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryPreference("retiro")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryPreference === "retiro"
                        ? "border-[#137D84] bg-[#137D84]/5 text-[#137D84] font-bold ring-1 ring-[#137D84]"
                        : "border-[#E8DDCF] bg-white text-[#5A6B75] hover:border-[#137D84]/40"
                    }`}
                  >
                    <span className="block text-xs">📍 Retiro en Tienda</span>
                    <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                      Punto en Punta Arenas
                    </span>
                  </button>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-xs font-bold text-[#263640] mb-1.5">
                  Notas u Observaciones (Opcional)
                </label>
                <textarea
                  rows={2}
                  maxLength={500}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="¿Alguna edad recomendada específica o consulta sobre componentes?"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8DDCF] bg-white text-xs text-[#263640] placeholder:text-[#5A6B75]/60 focus:outline-none focus:border-[#137D84] focus:ring-2 focus:ring-[#137D84]/20 transition-all resize-none"
                />
              </div>

              {/* Resumen Final */}
              <div className="pt-2 border-t border-[#E8DDCF] flex items-center justify-between text-sm">
                <span className="text-[#5A6B75]">Total a cotizar:</span>
                <span className="font-extrabold text-xl text-[#263640]">
                  {formatCLP(totalCLP)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-[#EF745B] hover:bg-[#D95F47] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Preparando solicitud...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Iniciar Chat de WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Pantalla de Respaldo Post-Envío */
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">
                    ¡Solicitud {inquiryResult.reference_code} creada con éxito!
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1">
                    Intentamos abrir WhatsApp en una nueva pestaña. Si tu navegador bloqueó la ventana emergente, puedes usar las opciones a continuación.
                  </p>
                </div>
              </div>

              {/* Caja de Texto Copiable */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#263640]">
                    Texto del Mensaje Estructurado:
                  </span>
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#137D84] hover:text-[#0E6167] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">¡Mensaje copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar mensaje</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white border border-[#E8DDCF] rounded-xl p-3.5 text-xs text-[#263640] font-mono whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed shadow-inner">
                  {inquiryResult.fallback_text}
                </div>
              </div>

              {/* Botones de Contingencia */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={inquiryResult.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#137D84] hover:bg-[#0E6167] text-white py-3 px-4 rounded-xl font-bold text-sm shadow transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Reintentar abrir WhatsApp</span>
                </a>

                <button
                  onClick={handleFinish}
                  type="button"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#5A6B75] hover:text-[#263640] transition-colors"
                >
                  Finalizar y vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
