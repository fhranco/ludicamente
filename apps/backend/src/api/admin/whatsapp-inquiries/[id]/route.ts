import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { WHATSAPP_INQUIRY_MODULE } from "../../../../modules/whatsapp-inquiry"
import { z } from "zod"

const updateInquirySchema = z.object({
  status: z
    .enum([
      "creada",
      "contacto_iniciado",
      "en_revision",
      "mix_confirmado",
      "cerrada",
      "cancelada",
    ])
    .optional(),
  internal_notes: z.string().nullable().optional(),
  confirmed_total_clp: z.number().nullable().optional(),
  confirmed_items_snapshot: z.any().nullable().optional(),
})

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const whatsappInquiryService = req.scope.resolve(WHATSAPP_INQUIRY_MODULE) as any
  const { id } = req.params

  const inquiry = await whatsappInquiryService.retrieveWhatsappInquiry(id)
  if (!inquiry) {
    return res.status(404).json({ message: "Solicitud no encontrada" })
  }

  return res.json({ inquiry })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const whatsappInquiryService = req.scope.resolve(WHATSAPP_INQUIRY_MODULE) as any
  const { id } = req.params

  const parsed = updateInquirySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: "Datos de actualización inválidos",
      errors: parsed.error.issues,
    })
  }

  const existing = await whatsappInquiryService.retrieveWhatsappInquiry(id)
  if (!existing) {
    return res.status(404).json({ message: "Solicitud no encontrada" })
  }

  const updated = await whatsappInquiryService.updateWhatsappInquiries({
    id,
    ...parsed.data,
  })

  return res.json({ inquiry: updated })
}
