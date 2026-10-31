import type { MedusaProduct } from "./medusa"

export interface ProductMediaResult {
  cutout: string
  actionPhoto: string
}

// Mapa curado para los 12 productos del catálogo de Lúdicamente:
// 1. cutout: Solo el juguete con fondo transparente (PNG puro en /products/cutouts/)
// 2. actionPhoto: Fotografía de niño/a usando y disfrutando del juguete
export const PRODUCT_MEDIA_MAP: Record<string, ProductMediaResult> = {
  "catan-edicion-clasica": {
    cutout: "/products/cutouts/catan-edicion-clasica.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80",
  },
  "dixit-el-arte-de-contar-historias": {
    cutout: "/products/cutouts/dixit-el-arte-de-contar-historias.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80",
  },
  "torre-de-equilibrio-madera-nativa": {
    cutout: "/products/cutouts/torre-de-equilibrio-madera-nativa.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
  },
  "kit-robotica-solar-stem": {
    cutout: "/products/cutouts/kit-robotica-solar-stem.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  },
  "puzzle-artistico-bosque-lluvioso": {
    cutout: "/products/cutouts/puzzle-artistico-bosque-lluvioso.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80",
  },
  "dobble-juego-de-reflejos": {
    cutout: "/products/cutouts/dobble-juego-de-reflejos.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=800&q=80",
  },
  "ajedrez-artesanal-magnetico": {
    cutout: "/products/cutouts/ajedrez-artesanal-magnetico.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
  },
  "fracciones-y-cuerpos-geometricos": {
    cutout: "/products/cutouts/fracciones-y-cuerpos-geometricos.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
  },
  "sonajero-mordedor-madera-montessori": {
    cutout: "/products/cutouts/sonajero-mordedor-madera-montessori.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
  },
  "bloques-sensoriales-arcoiris-madera": {
    cutout: "/products/cutouts/bloques-sensoriales-arcoiris-madera.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
  },
  "set-acuarelas-ecologicas-infantiles": {
    cutout: "/products/cutouts/set-acuarelas-ecologicas-infantiles.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
  },
  "microscopio-infantil-campo-led": {
    cutout: "/products/cutouts/microscopio-infantil-campo-led.png",
    actionPhoto:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
  },
}

/**
 * Obtiene la imagen de juguete aislado transparente (cutout) y la foto de niño/a jugando (actionPhoto)
 * para cualquier producto de Medusa o del catálogo base.
 */
export function getProductMedia(product: Partial<MedusaProduct>): ProductMediaResult {
  const handle = product.handle || ""
  const mapped = PRODUCT_MEDIA_MAP[handle]

  if (mapped) {
    return mapped
  }

  // Si el producto viene de Medusa con 2 o más fotos configuradas:
  // Imagen 0: Juguete transparente
  // Imagen 1: Niño usando el juguete
  const images = product.images || []
  const firstUrl = images[0]?.url || product.thumbnail || ""
  const secondUrl = images[1]?.url || firstUrl

  return {
    cutout: firstUrl,
    actionPhoto: secondUrl,
  }
}
