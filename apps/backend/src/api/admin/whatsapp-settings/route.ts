import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import fs from "fs"
import path from "path"
import { z } from "zod"

const SETTINGS_FILE = path.resolve(process.cwd(), "data/store-settings.json")

const settingsSchema = z.object({
  whatsapp_phone: z.string().min(8).max(30),
  whatsapp_default_message: z.string().min(5).max(300),
  hero_announcement: z.string().max(200),
  hero_title: z.string().min(3).max(150),
  hero_subtitle: z.string().max(300),
})

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
    whatsapp_phone: "+56912345678",
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

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const parsed = settingsSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: "Datos de configuración inválidos",
      errors: parsed.error.issues,
    })
  }

  const dir = path.dirname(SETTINGS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(parsed.data, null, 2), "utf-8")
  return res.json({ settings: parsed.data, message: "Configuración guardada exitosamente" })
}
