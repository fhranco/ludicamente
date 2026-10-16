import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { WHATSAPP_INQUIRY_MODULE } from "../modules/whatsapp-inquiry"

export interface CreateWhatsappInquiryInput {
  customer_name: string
  customer_phone?: string
  delivery_preference: "retiro" | "despacho_por_coordinar"
  customer_notes?: string
  idempotency_key?: string
  items: {
    variant_id: string
    quantity: number
  }[]
}

export interface InquirySummaryItem {
  variant_id: string
  product_id?: string
  product_title: string
  variant_title?: string
  sku?: string
  unit_price_clp: number
  quantity: number
  subtotal_clp: number
}

export const validateAndRecalculateInquiryStep = createStep(
  "validate-and-recalculate-inquiry-step",
  async (input: CreateWhatsappInquiryInput, { container }) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    const whatsappInquiryService = container.resolve(WHATSAPP_INQUIRY_MODULE) as any

    // 1. Idempotencia: Verificar si ya existe una consulta con esta clave
    if (input.idempotency_key) {
      const existing = await whatsappInquiryService.listWhatsappInquiries({
        idempotency_key: input.idempotency_key,
      })

      if (existing && existing.length > 0) {
        const record = existing[0]
        return new StepResponse({
          inquiry: record,
          is_duplicate: true,
          reference_code: record.reference_code,
          initial_total_clp: record.initial_total_clp,
          snapshot: record.initial_items_snapshot,
        })
      }
    }

    // 2. Consultar variantes y precios reales de Medusa en CLP
    // REGLA DE ORO: Se ignora cualquier precio enviado por el cliente
    const variantIds = input.items.map((i) => i.variant_id)
    const { data: variants } = await query.graph({
      entity: "product_variant",
      fields: [
        "id",
        "title",
        "sku",
        "product.id",
        "product.title",
        "price_set.prices.amount",
        "price_set.prices.currency_code",
      ],
      filters: { id: variantIds },
    })

    const variantMap = new Map<string, any>()
    for (const v of variants) {
      // Buscar precio en CLP dentro del price_set
      const prices = v.price_set?.prices || []
      const clpPrice = prices.find((p: any) => p.currency_code === "clp")
      const priceAmount = clpPrice ? Math.round(Number(clpPrice.amount)) : 0

      variantMap.set(v.id, {
        variant_id: v.id,
        variant_title: v.title,
        sku: v.sku,
        product_id: v.product?.id,
        product_title: v.product?.title || "Producto Lúdicamente",
        priceCLP: priceAmount,
      })
    }

    // 3. Construir snapshot inmutable y recalcular subtotal
    let totalCLP = 0
    const snapshot: InquirySummaryItem[] = []

    for (const item of input.items) {
      const v = variantMap.get(item.variant_id)
      const unitPrice = v?.priceCLP ?? 0
      const subtotal = unitPrice * item.quantity

      totalCLP += subtotal
      snapshot.push({
        variant_id: item.variant_id,
        product_id: v?.product_id,
        product_title: v?.product_title || "Producto",
        variant_title: v?.variant_title !== "Default Variant" ? v?.variant_title : undefined,
        sku: v?.sku,
        unit_price_clp: unitPrice,
        quantity: item.quantity,
        subtotal_clp: subtotal,
      })
    }

    // Generar código de referencia amigable (ej: LUD-123456)
    const referenceCode = `LUD-${Date.now().toString().slice(-6)}`

    // 4. Guardar registro en la base de datos
    const created = await whatsappInquiryService.createWhatsappInquiries({
      reference_code: referenceCode,
      status: "creada",
      customer_name: input.customer_name.trim(),
      customer_phone: input.customer_phone?.trim() || null,
      delivery_preference: input.delivery_preference,
      customer_notes: input.customer_notes?.trim() || null,
      initial_items_snapshot: snapshot,
      initial_total_clp: totalCLP,
      whatsapp_opened_at: new Date(),
      idempotency_key: input.idempotency_key || null,
    })

    return new StepResponse(
      {
        inquiry: created,
        is_duplicate: false,
        reference_code: referenceCode,
        initial_total_clp: totalCLP,
        snapshot,
      },
      created.id
    )
  },
  async (inquiryId, { container }) => {
    // Compensación en caso de rollback
    if (inquiryId) {
      const whatsappInquiryService = container.resolve(WHATSAPP_INQUIRY_MODULE) as any
      await whatsappInquiryService.deleteWhatsappInquiries(inquiryId)
    }
  }
)

export const createWhatsappInquiryWorkflow = createWorkflow(
  "create-whatsapp-inquiry-workflow",
  (input: CreateWhatsappInquiryInput) => {
    const result = validateAndRecalculateInquiryStep(input)
    return new WorkflowResponse(result)
  }
)
