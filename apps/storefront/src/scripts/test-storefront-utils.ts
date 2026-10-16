// Test unitario de formateadores y generador de mensajes de WhatsApp
import assert from "assert"

function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount)
}

function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\+/g, "").replace(/\s+/g, "").replace(/-/g, "")
}

function buildWhatsAppMessage(params: {
  customerName: string
  referenceCode: string
  deliveryPreference: "retiro" | "despacho_por_coordinar"
  items: { title: string; variantTitle?: string; quantity: number; subtotalCLP: number }[]
  totalCLP: number
  customerNotes?: string
}): string {
  const deliveryText =
    params.deliveryPreference === "retiro"
      ? "Retiro en tienda (Santiago)"
      : "Despacho por coordinar (todo Chile)"

  let text = `👋 ¡Hola Lúdicamente! Mi nombre es *${params.customerName.trim()}*.\n\n`
  text += `Deseo consultar por la disponibilidad de la siguiente solicitud (*${params.referenceCode}*):\n\n`

  params.items.forEach((item, idx) => {
    const formattedPrice = formatCLP(item.subtotalCLP)
    text += `${idx + 1}. *${item.title}* ${
      item.variantTitle ? `(${item.variantTitle})` : ""
    } x ${item.quantity} ud. — Ref: ${formattedPrice}\n`
  })

  text += `\n💰 *Subtotal Estimado:* ${formatCLP(params.totalCLP)}\n`
  text += `📦 *Preferencia de entrega:* ${deliveryText}\n`

  if (params.customerNotes) {
    text += `📝 *Observaciones:* ${params.customerNotes.trim()}\n`
  }

  text += `\n_Quedo atento/a para confirmar stock y coordinar. ¡Muchas gracias!_`
  return text
}

console.log("=== INICIANDO PRUEBAS UNITARIAS DE STOREFRONT ===")

// 1. Prueba de Formateador CLP
console.log("1. Probando formatCLP...")
const price1 = formatCLP(19990)
const price2 = formatCLP(34990)
const price3 = formatCLP(1500000)

console.log(`  - 19990 -> "${price1}"`)
console.log(`  - 34990 -> "${price2}"`)
console.log(`  - 1500000 -> "${price3}"`)

assert(price1.includes("19.990"), "Formato de miles incorrecto para 19990")
assert(!price1.includes(","), "No debe tener coma de decimales en CLP")
assert(price2.includes("34.990"), "Formato de miles incorrecto para 34990")
assert(price3.includes("1.500.000"), "Formato de millones incorrecto para 1500000")
console.log("✓ formatCLP pasó todas las aserciones.")

// 2. Prueba de Limpiador de Teléfono
console.log("\n2. Probando cleanPhoneNumber...")
const phone1 = cleanPhoneNumber("+56 9 1234 5678")
const phone2 = cleanPhoneNumber("+56-9-8765-4321")
assert.strictEqual(phone1, "56912345678", "Fallo al limpiar +56 9 1234 5678")
assert.strictEqual(phone2, "56987654321", "Fallo al limpiar +56-9-8765-4321")
console.log(`  - "+56 9 1234 5678" -> "${phone1}"`)
console.log(`  - "+56-9-8765-4321" -> "${phone2}"`)
console.log("✓ cleanPhoneNumber pasó todas las aserciones.")

// 3. Prueba de Generador de Mensaje de WhatsApp
console.log("\n3. Probando buildWhatsAppMessage...")
const msg = buildWhatsAppMessage({
  customerName: "Camila Soto",
  referenceCode: "LUD-998877",
  deliveryPreference: "retiro",
  customerNotes: "Horario de retiro preferente por la tarde.",
  totalCLP: 54980,
  items: [
    { title: "Catan: El Juego de Mesa", quantity: 1, subtotalCLP: 34990 },
    { title: "Torre de Aprendizaje", variantTitle: "Madera Natural", quantity: 1, subtotalCLP: 19990 },
  ],
})

assert(msg.includes("Camila Soto"), "El mensaje debe incluir el nombre del cliente")
assert(msg.includes("LUD-998877"), "El mensaje debe incluir el código de referencia")
assert(msg.includes("Catan: El Juego de Mesa"), "El mensaje debe incluir el producto 1")
assert(msg.includes("(Madera Natural)"), "El mensaje debe incluir la variante")
assert(msg.includes("Retiro en tienda"), "El mensaje debe reflejar la preferencia de retiro")
assert(msg.includes("Horario de retiro preferente"), "El mensaje debe incluir las notas del cliente")
assert(msg.includes("Lúdicamente"), "El mensaje debe tener la tilde correcta en Lúdicamente")

console.log("Mensaje generado para WhatsApp:\n---------------------------------")
console.log(msg)
console.log("---------------------------------")
console.log("✓ buildWhatsAppMessage pasó todas las aserciones.")

console.log("\n==========================================")
console.log("🎉 TODAS LAS PRUEBAS UNITARIAS PASARON EXITOSAMENTE")
console.log("==========================================")
