import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "@/components/ui/icons"
import { getProductByHandle, getProducts } from "@/lib/medusa"
import { ProductDetailView } from "@/components/product/product-detail-view"

interface Props {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProductByHandle(handle)

  if (!product) {
    return {
      title: "Producto no encontrado | Lúdicamente",
    }
  }

  const price = product.variants?.[0]?.calculated_price?.calculated_amount ?? 0

  return {
    title: `${product.title} | Lúdicamente Chile`,
    description:
      product.subtitle ||
      product.description ||
      `Consulta por ${product.title} en Lúdicamente. Juegos didácticos y de mesa con cotización directa a WhatsApp.`,
    openGraph: {
      title: `${product.title} | Lúdicamente`,
      description: product.description || undefined,
      images: product.thumbnail ? [{ url: product.thumbnail }] : [],
    },
  }
}

export default async function ProductoPage({ params }: Props) {
  const { handle } = await params
  const product = await getProductByHandle(handle)

  if (!product) {
    notFound()
  }

  const category = product.categories?.[0]
  const allProducts = await getProducts({ limit: 12 })
  const related = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const defaultPrice =
    product.variants?.[0]?.calculated_price?.calculated_amount ?? 0

  // JSON-LD para SEO estructurado (sin declarar InStock rígido)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    offers: {
      "@type": "Offer",
      price: defaultPrice,
      priceCurrency: "CLP",
      availability: "https://schema.org/PreOrder", // Disponibilidad por confirmar asistida
      url: `https://ludicamente.cl/producto/${product.handle}`,
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Script JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs accesibles */}
      <nav
        aria-label="Ruta de navegación"
        className="flex items-center gap-2 text-xs font-semibold text-[#8a8190] overflow-x-auto whitespace-nowrap pb-1 no-scrollbar"
      >
        <Link href="/" className="hover:text-[#4b347d] transition-colors">
          Inicio
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/tienda" className="hover:text-[#4b347d] transition-colors">
          Tienda
        </Link>
        {category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link
              href={`/categoria/${category.handle}`}
              className="hover:text-[#4b347d] transition-colors"
            >
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="font-extrabold text-[#2d2943] truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* Vista Detallada */}
      <ProductDetailView product={product} relatedProducts={related} />
    </div>
  )
}
