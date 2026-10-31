import { getCategories, getProducts, getStoreSettings } from "@/lib/medusa"
import { Hero } from "@/components/home/hero"
import { Ribbon } from "@/components/home/ribbon"
import { CategoryGrid } from "@/components/home/category-grid"
import { BirthdayEmergencyFinder } from "@/components/home/birthday-emergency-finder"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Editorial } from "@/components/home/editorial"
import { AgesSection } from "@/components/home/ages-section"
import { ManifestoSection } from "@/components/home/manifesto-section"
import { ClubSection } from "@/components/home/club-section"

// ISR: La portada se genera estáticamente y se revalida en segundo plano cada 30 min.
// Esto permite soportar millones de visitas y crawlers de Google con 0% de uso de CPU.
export const revalidate = 1800

export default async function HomePage() {
  const [categories, products, settings] = await Promise.all([
    getCategories(),
    getProducts({ limit: 50 }),
    getStoreSettings(),
  ])

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Editorial con Fotografía Infantil y Decorativos */}
      <Hero settings={settings} />

      {/* 2. Ribbon Ticker Pastel */}
      <Ribbon />

      {/* 3. Grilla de 5 Categorías Pastel: ¿Qué jugamos hoy? */}
      <CategoryGrid categories={categories} />

      {/* 4. Asistente / Banner: ¿Cumpleaños sorpresa o de curso? */}
      <BirthdayEmergencyFinder products={products} />

      {/* 5. Productos recomendados con productos reales del catálogo */}
      <FeaturedProducts products={products} categories={categories} />

      {/* 6. Sección Editorial: Los mejores recuerdos no necesitan batería */}
      <Editorial />

      {/* 7. Por Edades: Creciendo jugando (0 a 2, 3 a 5, 6 a 8, 9 a 12) */}
      <AgesSection />

      {/* 8. Filosofía y Manifiesto: No son solo juguetes. Son posibilidades. */}
      <ManifestoSection />

      {/* 9. Club de las buenas ideas */}
      <ClubSection />
    </div>
  )
}
