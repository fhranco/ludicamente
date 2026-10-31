import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import type { ExecArgs } from '@medusajs/framework/types'

interface ProductSyncRule {
  handle: string
  categoryHandle: string
  tags: string[]
}

const SYNC_RULES: ProductSyncRule[] = [
  {
    handle: 'catan-el-juego',
    categoryHandle: 'juegos-de-mesa',
    tags: ['edad:9+', 'habilidad:estrategia', 'habilidad:negociacion', 'juegos-en-familia', 'favorito-magallanes'],
  },
  {
    handle: 'catan-edicion-clasica',
    categoryHandle: 'juegos-de-mesa',
    tags: ['edad:9+', 'habilidad:estrategia', 'habilidad:negociacion', 'juegos-en-familia', 'favorito-magallanes'],
  },
  {
    handle: 'dixit-clasico',
    categoryHandle: 'juegos-de-mesa',
    tags: ['edad:6-8', 'edad:9+', 'habilidad:creatividad', 'habilidad:expresion-verbal', 'sin-pantallas'],
  },
  {
    handle: 'dixit-el-arte-de-contar-historias',
    categoryHandle: 'juegos-de-mesa',
    tags: ['edad:6-8', 'edad:9+', 'habilidad:creatividad', 'habilidad:expresion-verbal', 'sin-pantallas'],
  },
  {
    handle: 'torre-aprendizaje-montessori',
    categoryHandle: 'primera-infancia',
    tags: ['edad:1-3', 'edad:3-5', 'habilidad:autonomia', 'madera-natural', 'montessori'],
  },
  {
    handle: 'set-sensorial-bloques-suaves',
    categoryHandle: 'primera-infancia',
    tags: ['edad:0-12m', 'edad:1-3', 'habilidad:motricidad-fina', 'estimulacion-sensorial'],
  },
  {
    handle: 'smartgames-camelot-jr',
    categoryHandle: 'ingenio-y-logica',
    tags: ['edad:3-5', 'edad:6-8', 'habilidad:logica', 'habilidad:concentracion', 'desafio-individual'],
  },
  {
    handle: 'laberinto-magnetico-conteo',
    categoryHandle: 'material-pedagogico',
    tags: ['edad:3-5', 'habilidad:conteo', 'habilidad:motricidad-fina', 'madera-natural'],
  },
  {
    handle: 'acuarelas-botanicas-pinceles',
    categoryHandle: 'arte-y-creatividad',
    tags: ['edad:3-5', 'edad:6-8', 'habilidad:creatividad', 'material-ecologico'],
  },
  {
    handle: 'microscopio-optico-infantil',
    categoryHandle: 'ciencia-y-exploracion',
    tags: ['edad:6-8', 'edad:9+', 'habilidad:curiosidad-cientifica', 'stem'],
  },
  {
    handle: 'regletas-cuisenaire-madera',
    categoryHandle: 'material-pedagogico',
    tags: ['edad:3-5', 'edad:6-8', 'habilidad:matematicas', 'madera-natural', 'montessori'],
  },
  {
    handle: 'abaco-vertical-decimal',
    categoryHandle: 'material-pedagogico',
    tags: ['edad:6-8', 'habilidad:calculo-mental', 'madera-natural'],
  },
  {
    handle: 'fracciones-y-cuerpos-geometricos',
    categoryHandle: 'material-pedagogico',
    tags: ['edad:6-8', 'habilidad:geometria', 'madera-natural'],
  },
  {
    handle: 'torre-de-equilibrio-madera-nativa',
    categoryHandle: 'juegos-de-mesa',
    tags: ['edad:3-5', 'edad:6-8', 'habilidad:equilibrio', 'madera-natural', 'juegos-en-familia'],
  },
  {
    handle: 'kit-robotica-solar-stem',
    categoryHandle: 'ciencia-y-exploracion',
    tags: ['edad:6-8', 'edad:9+', 'habilidad:stem', 'energia-solar'],
  },
  {
    handle: 'dobble-juego-de-reflejos',
    categoryHandle: 'juegos-de-mesa',
    tags: ['edad:6-8', 'habilidad:reflejos', 'habilidad:atencion', 'juegos-de-viaje'],
  },
  {
    handle: 'ajedrez-artesanal-magnetico',
    categoryHandle: 'ingenio-y-logica',
    tags: ['edad:6-8', 'edad:9+', 'habilidad:estrategia', 'madera-natural'],
  },
  {
    handle: 'puzzle-artistico-bosque-lluvioso',
    categoryHandle: 'ingenio-y-logica',
    tags: ['edad:6-8', 'edad:9+', 'habilidad:concentracion', 'puzzles'],
  },
]

export default async function syncTagsAndCategories({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModule = container.resolve(Modules.PRODUCT)

  logger.info('🔄 Sincronizando categorías y etiquetas didácticas en Medusa...')

  // 1. Obtener categorías existentes
  const { data: categories } = await query.graph({
    entity: 'product_category',
    fields: ['id', 'handle', 'name'],
  })
  const categoryMap = new Map<string, string>()
  for (const c of categories) {
    categoryMap.set(c.handle, c.id)
  }

  // 2. Obtener tags existentes o crearlos
  const { data: existingTags } = await query.graph({
    entity: 'product_tag',
    fields: ['id', 'value'],
  })
  const tagMap = new Map<string, string>()
  for (const t of existingTags) {
    tagMap.set(t.value, t.id)
  }

  // Recolectar todos los tags únicos necesarios
  const allNeededTags = new Set<string>()
  for (const r of SYNC_RULES) {
    for (const t of r.tags) {
      allNeededTags.add(t)
    }
  }

  for (const tagValue of allNeededTags) {
    if (!tagMap.has(tagValue)) {
      try {
        const created = await productModule.createProductTags({ value: tagValue })
        tagMap.set(tagValue, created.id)
        logger.info(`+ Tag creado: ${tagValue} (${created.id})`)
      } catch (err) {
        logger.warn(`No se pudo crear tag ${tagValue}:`, err)
      }
    }
  }

  // 3. Obtener productos existentes
  const { data: products } = await query.graph({
    entity: 'product',
    fields: ['id', 'handle', 'title'],
  })

  let updatedCount = 0

  for (const prod of products) {
    const rule = SYNC_RULES.find((r) => r.handle === prod.handle)
    if (!rule) continue

    const categoryId = categoryMap.get(rule.categoryHandle)
    const tagIds = rule.tags
      .map((t) => tagMap.get(t))
      .filter((id): id is string => Boolean(id))

    try {
      await productModule.updateProducts(prod.id, {
        category_ids: categoryId ? [categoryId] : [],
        tag_ids: tagIds,
      } as never)
      updatedCount++
      logger.info(`✓ Producto actualizado [${prod.title}]: Categoría=${rule.categoryHandle}, Tags=${rule.tags.join(', ')}`)
    } catch (err) {
      logger.error(`Error actualizando producto ${prod.handle}:`, err)
    }
  }

  logger.info(`✨ Sincronización finalizada: ${updatedCount} productos enriquecidos con categorías y etiquetas oficiales.`)
}
