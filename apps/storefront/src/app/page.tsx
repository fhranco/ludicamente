import { getCategories, getProducts, getStoreSettings } from "@/lib/medusa"
import { Hero } from "@/components/home/hero"
import { Ribbon } from "@/components/home/ribbon"
import { CategoryGrid } from "@/components/home/category-grid"
import { BirthdayEmergencyFinder } from "@/components/home/birthday-emergency-finder"
import { Editorial } from "@/components/home/editorial"
import { AgesSection } from "@/components/home/ages-section"
import { ManifestoSection } from "@/components/home/manifesto-section"
import { ClubSection } from "@/components/home/club-section"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [categories, products, settings] = await Promise.all([
    getCategories(),
    getProducts({ limit: 50 }),
    getStoreSettings(),
  ])

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Editorial Ilustrado */}
      <Hero settings={settings} />

      {/* 2. Ribbon Ticker Animado */}
      <Ribbon />

      {/* 3. Grilla de 5 Categorías Pastel */}
      <CategoryGrid categories={categories} />

      {/* 3.5. Buscador de Emergencia S.O.S. Cumpleaños */}
      <BirthdayEmergencyFinder products={products} />

      {/* 4. Sección Editorial: Los mejores recuerdos no necesitan batería */}
      <Editorial />

      {/* 6. Por Edades: Creciendo Jugando (2+, 4+, 6+, 8+) */}
      <AgesSection />

      {/* 7. Filosofía y Manifiesto: No son solo juguetes */}
      <ManifestoSection />

      {/* 8. Club de las buenas ideas */}
      <ClubSection />
    </div>
  )
}
