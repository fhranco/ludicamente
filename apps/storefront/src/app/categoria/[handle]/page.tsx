import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, ArrowLeft } from "@/components/ui/icons"
import { getCategories, getProducts } from "@/lib/medusa"
import { CatalogView } from "@/components/catalog/catalog-view"

interface Props {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.handle === handle)

  if (!category) {
    return {
      title: "Colección no encontrada | Lúdicamente",
    }
  }

  return {
    title: `${category.name} | Lúdicamente Chile`,
    description:
      category.description ||
      `Explora la colección ${category.name} en Lúdicamente. Juegos y recursos didácticos con cotización directa en CLP.`,
    openGraph: {
      title: `${category.name} | Lúdicamente`,
      description: category.description || undefined,
    },
  }
}

export default async function CategoriaPage({ params }: Props) {
  const { handle } = await params
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ limit: 50 }),
  ])

  const category = categories.find((c) => c.handle === handle)
  if (!category) {
    notFound()
  }

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs font-semibold text-[#8a8190]">
        <Link href="/" className="hover:text-[#4b347d] transition-colors">
          Inicio
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/catalogo" className="hover:text-[#4b347d] transition-colors">
          Catálogo
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-extrabold text-[#2d2943]">{category.name}</span>
      </nav>

      {/* Cabecera de Categoría */}
      <div className="bg-white border border-[#efeae5] rounded-[28px] p-6 sm:p-10 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.145em] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#fa795f] inline-block shadow-[8px_0_0_#ffd678]" />
          <span className="ml-2">COLECCIÓN TEMÁTICA</span>
        </div>
        <h1 className="font-display font-semibold text-3xl sm:text-5xl text-[#2d2943] tracking-[-0.042em]">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-sm sm:text-base text-[#77727d] font-semibold max-w-2xl leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* Vista de Catálogo Pre-Filtrada */}
      <CatalogView
        initialProducts={allProducts}
        categories={categories}
        selectedCategoryHandle={category.handle}
      />
    </div>
  )
}
