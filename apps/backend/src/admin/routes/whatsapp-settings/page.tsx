import React, { useState, useEffect } from "react"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Adjustments, Check } from "@medusajs/icons"
import {
  Container,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Label,
} from "@medusajs/ui"

export const config = defineRouteConfig({
  label: "Ajustes WhatsApp & Tienda",
  icon: Adjustments,
})

interface StoreSettings {
  whatsapp_phone: string
  whatsapp_default_message: string
  hero_announcement: string
  hero_title: string
  hero_subtitle: string
}

export default function WhatsappSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>({
    whatsapp_phone: "+56912345678",
    whatsapp_default_message: "¡Hola Lúdicamente! Deseo consultar por la disponibilidad de mi pedido.",
    hero_announcement: "✦ EL JUEGO MÁS BONITO ES EL QUE SE COMPARTE ✦",
    hero_title: "Aprender y compartir, jugando en familia",
    hero_subtitle: "Juegos con sentido, materiales nobles y momentos inolvidables sin pantallas.",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  // Forzar modo claro
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      document.body.classList.remove("dark")
      document.body.classList.add("light")
    }
  }, [])

  useEffect(() => {
    fetch("/admin/whatsapp-settings", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings(data.settings)
        }
      })
      .catch((err) => console.error("Error al cargar ajustes:", err))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setErrorMsg("")

    try {
      const res = await fetch("/admin/whatsapp-settings", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const errData = await res.json()
        setErrorMsg(errData.message || "Error al guardar configuración.")
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error de red al guardar configuración.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Container className="p-8 max-w-4xl mx-auto space-y-6 bg-[#fffcf7] border border-[#efeae5] rounded-3xl shadow-xs">
      {/* Cabecera Lúdicamente */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#efeae5] pb-6">
        <div className="flex items-center gap-3.5">
          <span className="w-12 h-12 rounded-full bg-[#ecf19f] border-2 border-[#4b347d] flex items-center justify-center -rotate-6 shadow-sm shrink-0">
            <span className="text-2xl">⚙️</span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <Heading level="h1" className="font-display font-bold text-3xl text-[#4b347d] tracking-[-0.03em]">
                Ajustes de WhatsApp y Portada
              </Heading>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#ffd678] text-[#4b347d]">
                Canal Oficial
              </span>
            </div>
            <Text className="text-xs font-semibold text-[#77727d] mt-1">
              Configura el número de WhatsApp receptor de pedidos y los mensajes destacados de la tienda.
            </Text>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[#95899a] font-semibold">Cargando configuración...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6 bg-white border border-[#efeae5] rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* Número de WhatsApp */}
          <div className="space-y-2">
            <Label className="text-xs font-extrabold text-[#2d2943] uppercase tracking-wider">
              Número de WhatsApp para Pedidos (Formato internacional con código de país):
            </Label>
            <Input
              value={settings.whatsapp_phone}
              onChange={(e) => setSettings({ ...settings, whatsapp_phone: e.target.value })}
              placeholder="+56912345678"
              className="rounded-xl border-[#efeae5] font-mono text-sm"
              required
            />
            <Text className="text-xs text-[#8a8190]">
              Ejemplo para Chile: <code>+56912345678</code>. A este número se redirigirá a los clientes cuando hagan clic en &quot;Consultar por WhatsApp&quot;.
            </Text>
          </div>

          {/* Mensaje Predeterminado */}
          <div className="space-y-2">
            <Label className="text-xs font-extrabold text-[#2d2943] uppercase tracking-wider">
              Mensaje de Saludo Predeterminado:
            </Label>
            <Textarea
              value={settings.whatsapp_default_message}
              onChange={(e) => setSettings({ ...settings, whatsapp_default_message: e.target.value })}
              placeholder="¡Hola Lúdicamente! Deseo consultar por la disponibilidad de mi pedido."
              rows={2}
              className="rounded-xl border-[#efeae5] text-xs"
            />
            <Text className="text-xs text-[#8a8190]">
              Este saludo precederá al resumen de productos y al código de cotización en el mensaje del cliente.
            </Text>
          </div>

          <div className="border-t border-[#f4efe9] pt-6 space-y-4">
            <div className="text-xs font-extrabold text-[#4b347d] uppercase tracking-wider flex items-center gap-1.5">
              <span>✦</span>
              <span>Textos de Portada de la Tienda</span>
            </div>

            {/* Cinta Superior */}
            <div className="space-y-2">
              <Label className="text-xs font-extrabold text-[#2d2943] uppercase tracking-wider">
                Texto de la Cinta Superior (Announcement Banner):
              </Label>
              <Input
                value={settings.hero_announcement}
                onChange={(e) => setSettings({ ...settings, hero_announcement: e.target.value })}
                placeholder="✦ EL JUEGO MÁS BONITO ES EL QUE SE COMPARTE ✦"
                className="rounded-xl border-[#efeae5] text-xs"
              />
            </div>

            {/* Título Principal */}
            <div className="space-y-2">
              <Label className="text-xs font-extrabold text-[#2d2943] uppercase tracking-wider">
                Título del Hero (Portada):
              </Label>
              <Input
                value={settings.hero_title}
                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                placeholder="Aprender y compartir, jugando en familia"
                className="rounded-xl border-[#efeae5] font-display font-semibold text-sm"
              />
            </div>

            {/* Subtítulo Principal */}
            <div className="space-y-2">
              <Label className="text-xs font-extrabold text-[#2d2943] uppercase tracking-wider">
                Subtítulo de Portada:
              </Label>
              <Textarea
                value={settings.hero_subtitle}
                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                placeholder="Juegos con sentido, materiales nobles y momentos inolvidables sin pantallas."
                rows={2}
                className="rounded-xl border-[#efeae5] text-xs"
              />
            </div>
          </div>

          {/* Mensajes de feedback */}
          {errorMsg && (
            <div className="p-3.5 bg-[#ffe2e2] text-[#a32d2d] rounded-xl text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-[#d8f2df] text-[#1e5631] rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>¡Ajustes guardados con éxito en la base de datos!</span>
            </div>
          )}

          {/* Botón de Guardado */}
          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#fa795f] hover:bg-[#e7694f] text-white font-display font-bold px-6 py-2.5 text-sm shadow-sm"
            >
              {saving ? "Guardando..." : "Guardar Ajustes"}
            </Button>
          </div>
        </form>
      )}
    </Container>
  )
}
