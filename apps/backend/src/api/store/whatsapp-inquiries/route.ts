import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"
import { createWhatsappInquiryWorkflow } from "../../../workflows/create-whatsapp-inquiry"

const itemSchema = z.object({
  variant_id: z.string().min(1),
  quantity: z.number().int().positive().default(1),
})

const createWhatsappInquirySchema = z.object({
  customer_name: z.string().min(1).max(100),
  customer_phone: z.string().max(30).optional(),
  delivery_preference: z
    .enum(["retiro", "despacho_por_coordinar"])
    .default("despacho_por_coordinar"),
  customer_notes: z.string().max(500).optional(),
  idempotency_key: z.string().optional(),
  items: z.array(itemSchema).min(1),
})

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const parsed = createWhatsappInquirySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: "Datos de solicitud inválidos",
      errors: parsed.error.issues,
    })
  }

  const { result } = await createWhatsappInquiryWorkflow(req.scope).run({
    input: parsed.data,
  })

  let phone = process.env.WHATSAPP_PHONE || "+56912345678"
  try {
    const fs = await import("fs")
    const path = await import("path")
    const settingsPath = path.resolve(process.cwd(), "data/store-settings.json")
    if (fs.existsSync(settingsPath)) {
      const data = JSON.parse(fs.readFileSync(settingsPath, "utf-8"))
      if (data.whatsapp_phone) phone = data.whatsapp_phone
    }
  } catch {}
  const cleanPhone = phone.replace(/\+/g, "").replace(/\s+/g, "")
  const deliveryText =
    parsed.data.delivery_preference === "retiro"
      ? "Retiro en tienda (Punta Arenas)"
      : "Despacho por coordinar (Punta Arenas / Magallanes / Todo Chile)"

  let fallbackText = `👋 ¡Hola Lúdicamente! Mi nombre es *${parsed.data.customer_name}*.\n\n`
  fallbackText += `Deseo consultar por la disponibilidad de la siguiente solicitud (*${result.reference_code}*):\n\n`

  result.snapshot.forEach((item: any, idx: number) => {
    const formattedPrice = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(item.subtotal_clp)

    fallbackText += `${idx + 1}. *${item.product_title}* ${
      item.variant_title ? `(${item.variant_title})` : ""
    } x ${item.quantity} ud. — Ref: ${formattedPrice}\n`
  })

  const formattedTotal = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(result.initial_total_clp)

  fallbackText += `\n💰 *Subtotal Estimado:* ${formattedTotal}\n`
  fallbackText += `📦 *Preferencia de entrega:* ${deliveryText}\n`

  if (parsed.data.customer_notes) {
    fallbackText += `📝 *Observaciones:* ${parsed.data.customer_notes}\n`
  }

  fallbackText += `\n_Quedo atento/a para confirmar stock y coordinar. ¡Muchas gracias!_`

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    fallbackText
  )}`

  return res.status(201).json({
    reference_code: result.reference_code,
    whatsapp_url: whatsappUrl,
    fallback_text: fallbackText,
    summary: {
      total_clp: result.initial_total_clp,
      items_count: result.snapshot.length,
      is_duplicate: result.is_duplicate,
    },
    inquiry: result.inquiry,
  })
}
