import { MedusaService } from "@medusajs/framework/utils"
import { WhatsappInquiry } from "./models/whatsapp-inquiry"

export default class WhatsappInquiryModuleService extends MedusaService({
  WhatsappInquiry,
}) {}
