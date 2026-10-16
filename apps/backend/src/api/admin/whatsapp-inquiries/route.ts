import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { WHATSAPP_INQUIRY_MODULE } from "../../../modules/whatsapp-inquiry"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const whatsappInquiryService = req.scope.resolve(WHATSAPP_INQUIRY_MODULE) as any

  const { q, status, limit = 50, offset = 0 } = req.query as {
    q?: string
    status?: string
    limit?: string
    offset?: string
  }

  const filters: Record<string, any> = {}
  if (status && status !== "todos") {
    filters.status = status
  }

  // Si hay término de búsqueda por código de referencia
  if (q) {
    filters.$or = [
      { reference_code: { $ilike: `%${q}%` } },
      { customer_name: { $ilike: `%${q}%` } },
    ]
  }

  const [inquiries, count] = await whatsappInquiryService.listAndCountWhatsappInquiries(
    filters,
    {
      order: { created_at: "DESC" },
      take: Number(limit),
      skip: Number(offset),
    }
  )

  return res.json({
    inquiries,
    count,
    limit: Number(limit),
    offset: Number(offset),
  })
}
