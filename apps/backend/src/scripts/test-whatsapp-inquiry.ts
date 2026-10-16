const BACKEND_URL = "http://localhost:9000"
const PUBLISHABLE_KEY = "pk_d5e88e24a03f16829bea3a500756f5fdcd8f51504fc19d78d32271291debfd8d"

async function runTests() {
  console.log("=== INICIANDO PRUEBAS DE WHATSAPP INQUIRY ===")

  // 1. Obtener productos y variantes de Medusa
  const prodRes = await fetch(`${BACKEND_URL}/store/products`, {
    headers: {
      "x-publishable-api-key": PUBLISHABLE_KEY,
    },
  })
  if (!prodRes.ok) {
    throw new Error(`Error al obtener productos: ${prodRes.status} ${await prodRes.text()}`)
  }
  const { products } = await prodRes.json()
  console.log(`✓ Productos encontrados en catálogo: ${products.length}`)

  const testProduct = products[0]
  const testVariant = testProduct.variants[0]
  console.log(`✓ Variante seleccionada para prueba: ${testProduct.title} (${testVariant.id})`)

  // 2. Probar creación de solicitud legítima
  const idempotencyKey = `test-idem-${Date.now()}`
  const payloadLegit = {
    customer_name: "Constanza Valenzuela",
    customer_phone: "+56 9 8765 4321",
    delivery_preference: "despacho_por_coordinar",
    customer_notes: "Por favor avisar si tienen disponibilidad para envío a Valparaíso.",
    idempotency_key: idempotencyKey,
    items: [
      {
        variant_id: testVariant.id,
        quantity: 2,
      },
    ],
  }

  const createRes = await fetch(`${BACKEND_URL}/store/whatsapp-inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
    },
    body: JSON.stringify(payloadLegit),
  })

  if (!createRes.ok) {
    const errText = await createRes.text()
    throw new Error(`Error en POST /store/whatsapp-inquiries: ${createRes.status} ${errText}`)
  }

  const createData = await createRes.json()
  console.log("✓ Solicitud creada exitosamente:")
  console.log(`  - Código de Referencia: ${createData.reference_code}`)
  console.log(`  - Total Recalculado en Servidor (CLP): $${createData.summary.total_clp}`)
  console.log(`  - URL de WhatsApp: ${createData.whatsapp_url.substring(0, 60)}...`)
  console.log(`  - Es duplicado?: ${createData.summary.is_duplicate}`)

  if (!createData.reference_code.startsWith("LUD-")) {
    throw new Error("El reference_code no tiene el formato esperado LUD-XXXXXX")
  }
  if (createData.summary.total_clp <= 0) {
    throw new Error("El total recalculado en CLP debe ser mayor a 0")
  }

  // 3. Probar intento de manipulación de precio por el cliente
  console.log("\n--- Prueba de Regla de Oro: Intento de inyección de precio por cliente ---")
  const tamperedPayload = {
    customer_name: "Hacker Malicioso",
    delivery_preference: "retiro",
    items: [
      {
        variant_id: testVariant.id,
        quantity: 2,
        price: 1, // Intentando forzar precio a $1 peso
        unit_price_clp: 1,
      },
    ],
  }

  const tamperedRes = await fetch(`${BACKEND_URL}/store/whatsapp-inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
    },
    body: JSON.stringify(tamperedPayload),
  })
  const tamperedData = await tamperedRes.json()
  console.log(`✓ Servidor calculó total: $${tamperedData.summary.total_clp}`)
  if (tamperedData.summary.total_clp === 2) {
    throw new Error("VULNERABILIDAD CRÍTICA: El servidor aceptó el precio inyectado por el cliente!")
  }
  console.log("✓ ÉXITO: El servidor ignoró completamente el precio inyectado y recalculó desde la base de datos.")

  // 4. Probar idempotencia (mismo idempotency_key)
  console.log("\n--- Prueba de Idempotencia: Repetición de solicitud con misma clave ---")
  const duplicateRes = await fetch(`${BACKEND_URL}/store/whatsapp-inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
    },
    body: JSON.stringify(payloadLegit),
  })
  const duplicateData = await duplicateRes.json()
  console.log(`✓ Solicitud repetida procesada:`)
  console.log(`  - Código retornado: ${duplicateData.reference_code}`)
  console.log(`  - Es duplicado detectado?: ${duplicateData.summary.is_duplicate}`)
  if (duplicateData.reference_code !== createData.reference_code) {
    throw new Error("Fallo de Idempotencia: debió retornar la misma solicitud existente.")
  }
  if (!duplicateData.summary.is_duplicate) {
    throw new Error("Fallo de Idempotencia: is_duplicate debería ser true")
  }
  console.log("✓ ÉXITO: Idempotencia verificada correctamente.")

  console.log("\n==========================================")
  console.log("🎉 TODAS LAS PRUEBAS DE WHATSAPP INQUIRY PASARON CON ÉXITO")
  console.log("==========================================")
}

runTests().catch((err) => {
  console.error("❌ ERROR EN PRUEBAS:", err)
  process.exit(1)
})
