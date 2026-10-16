import { model } from "@medusajs/framework/utils"

export const WhatsappInquiry = model.define("whatsapp_inquiry", {
  id: model.id().primaryKey(),
  reference_code: model.text().unique(),
  status: model
    .enum([
      "creada",
      "contacto_iniciado",
      "en_revision",
      "mix_confirmado",
      "cerrada",
      "cancelada",
    ])
    .default("creada"),
  customer_name: model.text(),
  customer_phone: model.text().nullable(),
  delivery_preference: model.text().default("despacho_por_coordinar"),
  customer_notes: model.text().nullable(),
  initial_items_snapshot: model.json(),
  initial_total_clp: model.number(),
  confirmed_items_snapshot: model.json().nullable(),
  confirmed_total_clp: model.number().nullable(),
  whatsapp_opened_at: model.dateTime().nullable(),
  internal_notes: model.text().nullable(),
  idempotency_key: model.text().unique().nullable(),
})
