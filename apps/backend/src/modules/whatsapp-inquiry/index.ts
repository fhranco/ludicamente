import { Module } from "@medusajs/framework/utils"
import WhatsappInquiryModuleService from "./service"

export const WHATSAPP_INQUIRY_MODULE = "whatsappInquiry"

export default Module(WHATSAPP_INQUIRY_MODULE, {
  service: WhatsappInquiryModuleService,
})
