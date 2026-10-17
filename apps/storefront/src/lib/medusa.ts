const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

export interface MedusaProductCategory {
  id: string
  name: string
  handle: string
  description?: string
  parent_category_id?: string | null
}

export interface MedusaProductVariant {
  id: string
  title: string
  sku: string
  manage_inventory: boolean
  calculated_price?: {
    calculated_amount: number
    currency_code: string
  }
}

export interface MedusaProductTag {
  id: string
  value: string
}

export interface MedusaProduct {
  id: string
  title: string
  handle: string
  subtitle?: string | null
  description?: string | null
  thumbnail?: string | null
  images?: { id: string; url: string }[]
  categories?: MedusaProductCategory[]
  tags?: MedusaProductTag[]
  variants: MedusaProductVariant[]
}

/**
 * Obtiene la región oficial de Chile configurada en Medusa.
 */
export async function getChileRegionId(): Promise<string | null> {
  try {
    const res = await fetch(`${MEDUSA_BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) return null
    const data = await res.json()
    const chileRegion = data.regions?.find(
      (r: { currency_code: string }) => r.currency_code === "clp"
    )
    return chileRegion?.id || data.regions?.[0]?.id || null
  } catch (error) {
    console.error("Error fetching Chile region:", error)
    return null
  }
}

import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./fallback-data"

/**
 * Obtiene todas las categorías oficiales de productos.
 */
export async function getCategories(): Promise<MedusaProductCategory[]> {
  try {
    const res = await fetch(`${MEDUSA_BACKEND_URL}/store/product-categories`, {
      headers: {
        "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) return FALLBACK_CATEGORIES
    const data = await res.json()
    const categories = data.product_categories || []
    return categories.length > 0 ? categories : FALLBACK_CATEGORIES
  } catch (error) {
    console.warn("Backend Medusa no disponible, usando categorías catálogo base:", error)
    return FALLBACK_CATEGORIES
  }
}

/**
 * Obtiene la lista de productos con precios calculados en CLP.
 */
export async function getProducts(options?: {
  categoryId?: string
  limit?: number
}): Promise<MedusaProduct[]> {
  try {
    const regionId = await getChileRegionId()
    const url = new URL(`${MEDUSA_BACKEND_URL}/store/products`)

    if (regionId) {
      url.searchParams.set("region_id", regionId)
    }
    url.searchParams.set(
      "fields",
      "*variants.calculated_price,*categories,*images,*tags"
    )

    if (options?.categoryId) {
      url.searchParams.set("category_id[]", options.categoryId)
    }
    if (options?.limit) {
      url.searchParams.set("limit", options.limit.toString())
    }

    const res = await fetch(url.toString(), {
      headers: {
        "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
      },
      next: { revalidate: 30 },
    })

    if (!res.ok) {
      console.warn(`Medusa API no respondió (${res.status}), usando catálogo base`)
      return filterFallbackProducts(options)
    }

    const data = await res.json()
    const products: MedusaProduct[] = data.products || []
    return products.length > 0 ? products : filterFallbackProducts(options)
  } catch (error) {
    console.warn("Backend Medusa no disponible, usando catálogo base de juegos:", error)
    return filterFallbackProducts(options)
  }
}

function filterFallbackProducts(options?: {
  categoryId?: string
  limit?: number
}): MedusaProduct[] {
  let list = [...FALLBACK_PRODUCTS]
  if (options?.categoryId) {
    list = list.filter((p) =>
      p.categories?.some((c) => c.id === options.categoryId || c.handle === options.categoryId)
    )
  }
  if (options?.limit && options.limit > 0) {
    list = list.slice(0, options.limit)
  }
  return list
}

/**
 * Obtiene un producto por su handle con precios calculados en CLP.
 */
export async function getProductByHandle(
  handle: string
): Promise<MedusaProduct | null> {
  try {
    const regionId = await getChileRegionId()
    const url = new URL(`${MEDUSA_BACKEND_URL}/store/products`)

    if (regionId) {
      url.searchParams.set("region_id", regionId)
    }
    url.searchParams.set("handle", handle)
    url.searchParams.set(
      "fields",
      "*variants.calculated_price,*categories,*images,*tags"
    )

    const res = await fetch(url.toString(), {
      headers: {
        "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
      },
      next: { revalidate: 30 },
    })

    if (!res.ok) {
      return FALLBACK_PRODUCTS.find((p) => p.handle === handle) || null
    }
    const data = await res.json()
    const prod = data.products?.[0]
    return prod || FALLBACK_PRODUCTS.find((p) => p.handle === handle) || null
  } catch (error) {
    console.warn(`Error al consultar producto ${handle}, buscando en catálogo base:`, error)
    return FALLBACK_PRODUCTS.find((p) => p.handle === handle) || null
  }
}

export interface StoreSettings {
  whatsapp_phone: string
  whatsapp_default_message: string
  hero_announcement: string
  hero_title: string
  hero_subtitle: string
}

/**
 * Obtiene la configuración pública de la tienda (número de WhatsApp y textos de portada).
 */
export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const res = await fetch(`${MEDUSA_BACKEND_URL}/store/settings`, {
      headers: {
        "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
      },
      next: { revalidate: 30 },
    })
    if (!res.ok) throw new Error("Settings fetch failed")
    const data = await res.json()
    return data.settings
  } catch {
    return {
      whatsapp_phone: "+56912345678",
      whatsapp_default_message:
        "¡Hola Lúdicamente! Deseo consultar por la disponibilidad de mi pedido.",
      hero_announcement:
        "[DEMO - POR CONFIGURAR] Catálogo de juegos de mesa y material didáctico — Cotiza y confirma por WhatsApp",
      hero_title: "Aprender y compartir, jugando en familia",
      hero_subtitle:
        "Explora nuestra cuidada selección de juegos de mesa, juguetes y material didáctico. Elige tus favoritos y coordina la entrega directamente con nosotros por WhatsApp.",
    }
  }
}

