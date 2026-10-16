import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import fs from "fs"
import path from "path"

const SETTINGS_FILE = path.resolve(process.cwd(), "data/store-settings.json")

function readSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, "utf-8")
      return JSON.parse(data)
    }
  } catch (err) {
    console.error("Error leyendo store-settings.json:", err)
  }
  return {
    whatsapp_phone: process.env.WHATSAPP_PHONE || "+56912345678",
    whatsapp_default_message: "¡Hola Lúdicamente! Deseo consultar por la disponibilidad de mi pedido.",
    hero_announcement: "[DEMO - POR CONFIGURAR] Catálogo de juegos de mesa y material didáctico",
    hero_title: "Aprender y compartir, jugando en familia",
    hero_subtitle: "Explora nuestra cuidada selección y coordina directamente por WhatsApp.",
  }
}

export const GET = async (_req: MedusaRequest, res: MedusaResponse) => {
  const settings = readSettings()
  return res.json({ settings })
}
