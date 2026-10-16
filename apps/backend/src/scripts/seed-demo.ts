import {
  createApiKeysWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingProfilesWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  updateStoresWorkflow,
} from '@medusajs/medusa/core-flows'
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from '@medusajs/framework/utils'
import type { ExecArgs } from '@medusajs/framework/types'

export default async function seedDemo({ container }: ExecArgs) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('[Lúdicamente] DEMO seed está estrictamente prohibido en producción.')
  }

  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModule = container.resolve(Modules.PRODUCT)

  logger.info('🎲 Iniciando Seed DEMO Chile para Lúdicamente...')

  // 1. Configurar Tienda y Moneda CLP
  const { data: stores } = await query.graph({
    entity: 'store',
    fields: ['id', 'name', 'supported_currencies.currency_code', 'default_currency_code'],
  })

  let store = stores[0]
  if (store) {
    logger.info('Configurando CLP como moneda por defecto en la tienda...')
    await updateStoresWorkflow(container).run({
      input: {
        selector: { id: store.id },
        update: {
          name: 'Lúdicamente',
          supported_currencies: [
            { currency_code: 'clp', is_default: true },
            { currency_code: 'usd', is_default: false },
          ],
        },
      },
    })
  }

  // 2. Perfil de Envíos por Defecto
  const { data: existingProfiles } = await query.graph({
    entity: 'shipping_profile',
    fields: ['id', 'name', 'type'],
  })

  let shippingProfile = existingProfiles.find((p: { type: string }) => p.type === 'default') || existingProfiles[0]
  if (!shippingProfile) {
    logger.info('Creando perfil de envíos por defecto...')
    const { result } = await createShippingProfilesWorkflow(container).run({
      input: {
        shipping_profiles: [
          {
            name: 'Envíos Nacionales Lúdicamente',
            type: 'default',
          },
        ],
      },
    })
    shippingProfile = result[0]
  }

  // 3. Región Chile (CLP)
  const { data: regions } = await query.graph({
    entity: 'region',
    fields: ['id', 'name', 'currency_code', 'countries.iso_2'],
  })

  let chileRegion = regions.find((r: { currency_code: string }) => r.currency_code === 'clp')
  if (!chileRegion) {
    logger.info('Creando Región Chile con moneda CLP...')
    const { result } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: 'Chile',
            currency_code: 'clp',
            countries: ['cl'],
          },
        ],
      },
    })
    chileRegion = result[0]
  }

  // 4. Canal de Ventas
  const { data: salesChannels } = await query.graph({
    entity: 'sales_channel',
    fields: ['id', 'name'],
  })

  let salesChannel = salesChannels.find((sc: { name: string }) => sc.name.includes('Lúdicamente')) || salesChannels[0]
  if (!salesChannel) {
    logger.info('Creando Canal de Ventas Lúdicamente...')
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: {
        sales_channels: [
          {
            name: 'Canal Web Lúdicamente',
            description: 'Canal de ventas y catálogo principal online',
          },
        ],
      },
    })
    salesChannel = result[0]
  }

  // 5. Publishable API Key para el Storefront
  const { data: apiKeys } = await query.graph({
    entity: 'api_key',
    fields: ['id', 'token', 'title', 'type'],
    filters: { type: 'publishable' },
  })

  let publishableKey = apiKeys.find((k: { title: string }) => k.title.includes('Lúdicamente')) || apiKeys[0]
  if (!publishableKey) {
    logger.info('Creando Publishable API Key para el Storefront...')
    const { result } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: 'Lúdicamente Storefront Key',
            type: 'publishable',
          },
        ],
      },
    })
    publishableKey = result[0]
  }

  // Vincular Publishable Key con Sales Channel
  if (publishableKey && salesChannel) {
    try {
      await linkSalesChannelsToApiKeyWorkflow(container).run({
        input: {
          id: publishableKey.id,
          add: [salesChannel.id],
        },
      })
      logger.info(`Publishable Key vinculada a Canal: ${salesChannel.name}`)
    } catch {
      // Ya vinculado o sin cambios
    }
  }

  logger.info(`🔑 Token de Publishable Key: ${publishableKey?.token}`)

  // 6. Categorías DEMO (6 categorías)
  const DEMO_CATEGORIES = [
    {
      name: 'Juegos de Mesa Familiares',
      handle: 'juegos-de-mesa-familiares',
      description: 'Diversión para compartir entre grandes y chicos con reglas accesibles.',
      metadata: {
        image_url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80',
      },
    },
    {
      name: 'Estrategia y Rol',
      handle: 'estrategia-y-rol',
      description: 'Desafíos tácticos, gestión de recursos e inmersión narrativa.',
      metadata: {
        image_url: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80',
      },
    },
    {
      name: 'Puzzles y Rompecabezas',
      handle: 'puzzles-y-rompecabezas',
      description: 'Concentración, paciencia y arte en piezas de alta calidad.',
      metadata: {
        image_url: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80',
      },
    },
    {
      name: 'Estimulación Temprana y Madera',
      handle: 'estimulacion-temprana-madera',
      description: 'Materiales nobles, motricidad fina y texturas cálidas para la primera infancia.',
      metadata: {
        image_url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
      },
    },
    {
      name: 'Material Didáctico y STEM',
      handle: 'material-didactico-stem',
      description: 'Ciencia, tecnología, matemáticas y exploración experimental pedagógica.',
      metadata: {
        image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      },
    },
    {
      name: 'Juegos de Cartas y Viaje',
      handle: 'juegos-de-cartas-viaje',
      description: 'Portátiles, ágiles y perfectos para llevar en vacaciones y encuentros.',
      metadata: {
        image_url: 'https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=600&q=80',
      },
    },
  ]

  const { data: existingCategories } = await query.graph({
    entity: 'product_category',
    fields: ['id', 'name', 'handle'],
  })

  const categoryMap = new Map<string, string>()
  for (const cat of existingCategories) {
    categoryMap.set(cat.handle, cat.id)
  }

  for (const catData of DEMO_CATEGORIES) {
    if (!categoryMap.has(catData.handle)) {
      const created = await productModule.createProductCategories(catData)
      categoryMap.set(catData.handle, created.id)
      logger.info(`Categoría creada: ${catData.name}`)
    }
  }

  // 7. Productos DEMO (8 productos en CLP con variantes y manage_inventory: false)
  const DEMO_PRODUCTS = [
    {
      title: 'Catán: Edición Clásica',
      handle: 'catan-edicion-clasica',
      subtitle: 'El clásico mundial de negociación y colonización [DEMO]',
      description:
        'Construye caminos, poblados y ciudades negociando lana, madera, trigo y mineral. [DEMO - DISPONIBILIDAD POR CONFIRMAR]',
      categoryHandle: 'estrategia-y-rol',
      thumbnail: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
      options: [
        {
          title: 'Edición',
          values: ['Estándar Español'],
        },
      ],
      variants: [
        {
          title: 'Estándar Español',
          sku: 'CAT-CLAS-ES',
          manage_inventory: false,
          options: { Edición: 'Estándar Español' },
          prices: [{ amount: 34990, currency_code: 'clp' }],
        },
      ],
    },
    {
      title: 'Dixit: El Arte de Contar Historias',
      handle: 'dixit-el-arte-de-contar-historias',
      subtitle: 'Juego poético y visual de deducción e imaginación [DEMO]',
      description:
        'Cada carta evoca una historia enigmática ilustrada con poesía visual. [DEMO - DISPONIBILIDAD POR CONFIRMAR]',
      categoryHandle: 'juegos-de-mesa-familiares',
      thumbnail: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80',
      options: [
        {
          title: 'Versión',
          values: ['Edición Clásica (84 Cartas)', 'Edición Odyssey (Hasta 12 Jugadores)'],
        },
      ],
      variants: [
        {
          title: 'Edición Clásica (84 Cartas)',
          sku: 'DIX-CLAS-84',
          manage_inventory: false,
          options: { Versión: 'Edición Clásica (84 Cartas)' },
          prices: [{ amount: 29990, currency_code: 'clp' }],
        },
        {
          title: 'Edición Odyssey (Hasta 12 Jugadores)',
          sku: 'DIX-ODY-12',
          manage_inventory: false,
          options: { Versión: 'Edición Odyssey (Hasta 12 Jugadores)' },
          prices: [{ amount: 36990, currency_code: 'clp' }],
        },
      ],
    },
    {
      title: 'Torre de Equilibrio en Madera Nativa',
      handle: 'torre-de-equilibrio-madera-nativa',
      subtitle: '54 bloques de madera pulida para pulso y tensión [DEMO]',
      description:
        'Madera suave al tacto con bordes redondeados para horas de entretenimiento seguro. [DEMO - DISPONIBILIDAD POR CONFIRMAR]',
      categoryHandle: 'estimulacion-temprana-madera',
      thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
      options: [
        {
          title: 'Acabado',
          values: ['Madera Natural Pulida', 'Edición Multicolor Didáctica'],
        },
      ],
      variants: [
        {
          title: 'Madera Natural Pulida',
          sku: 'TOR-NAT-54',
          manage_inventory: false,
          options: { Acabado: 'Madera Natural Pulida' },
          prices: [{ amount: 16990, currency_code: 'clp' }],
        },
        {
          title: 'Edición Multicolor Didáctica',
          sku: 'TOR-COL-54',
          manage_inventory: false,
          options: { Acabado: 'Edición Multicolor Didáctica' },
          prices: [{ amount: 19990, currency_code: 'clp' }],
        },
      ],
    },
    {
      title: 'Kit Científico de Robótica Solar STEM',
      handle: 'kit-robotica-solar-stem',
      subtitle: 'Educación tecnológica práctica y energías limpias [DEMO]',
      description:
        'Aprende mecánica, circuitos y captación fotovoltaica armando modelos funcionales sin pilas. [DEMO - DISPONIBILIDAD POR CONFIRMAR]',
      categoryHandle: 'material-didactico-stem',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      options: [
        {
          title: 'Set',
          values: ['Kit 6 en 1 Inicial', 'Kit 12 en 1 Avanzado'],
        },
      ],
      variants: [
        {
          title: 'Kit 6 en 1 Inicial',
          sku: 'ROB-SOL-06',
          manage_inventory: false,
          options: { Set: 'Kit 6 en 1 Inicial' },
          prices: [{ amount: 24990, currency_code: 'clp' }],
        },
        {
          title: 'Kit 12 en 1 Avanzado',
          sku: 'ROB-SOL-12',
          manage_inventory: false,
          options: { Set: 'Kit 12 en 1 Avanzado' },
          prices: [{ amount: 32990, currency_code: 'clp' }],
        },
      ],
    },
    {
      title: 'Puzzle Artístico 1000 Piezas — Bosque Lluvioso',
      handle: 'puzzle-artistico-bosque-lluvioso',
      subtitle: 'Ilustración botánica en cartón reciclado extra-grueso [DEMO]',
      description:
        'Corte de precisión con encaje perfecto y acabado mate antirreflejo. [DEMO - DISPONIBILIDAD POR CONFIRMAR]',
      categoryHandle: 'puzzles-y-rompecabezas',
      thumbnail: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80',
      options: [
        {
          title: 'Piezas',
          values: ['500 Piezas', '1000 Piezas'],
        },
      ],
      variants: [
        {
          title: '500 Piezas',
          sku: 'PUZ-BOSQ-500',
          manage_inventory: false,
          options: { Piezas: '500 Piezas' },
          prices: [{ amount: 14990, currency_code: 'clp' }],
        },
        {
          title: '1000 Piezas',
          sku: 'PUZ-BOSQ-1000',
          manage_inventory: false,
          options: { Piezas: '1000 Piezas' },
          prices: [{ amount: 18990, currency_code: 'clp' }],
        },
      ],
    },
    {
      title: 'Dobble: Juego de Reflejos y Percepción',
      handle: 'dobble-juego-de-reflejos',
      subtitle: 'Encuentra el símbolo idéntico antes que tus rivales [DEMO]',
      description:
        'Lata metálica de viaje con 55 cartas y 5 modos de juego ultra dinámicos. [DEMO - DISPONIBILIDAD POR CONFIRMAR]',
      categoryHandle: 'juegos-de-cartas-viaje',
      thumbnail: 'https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=800&q=80',
      options: [
        {
          title: 'Edición',
          values: ['Clásico en Lata', 'Dobble Kids (Fauna y Colores)'],
        },
      ],
      variants: [
        {
          title: 'Clásico en Lata',
          sku: 'DOB-CLAS-55',
          manage_inventory: false,
          options: { Edición: 'Clásico en Lata' },
          prices: [{ amount: 12990, currency_code: 'clp' }],
        },
        {
          title: 'Dobble Kids (Fauna y Colores)',
          sku: 'DOB-KIDS-30',
          manage_inventory: false,
          options: { Edición: 'Dobble Kids (Fauna y Colores)' },
          prices: [{ amount: 11990, currency_code: 'clp' }],
        },
      ],
    },
    {
      title: 'Ajedrez Artesanal Magnético Plegable',
      handle: 'ajedrez-artesanal-magnetico',
      subtitle: 'Tablero de madera con piezas ponderadas y fieltro [DEMO]',
      description:
        'Elegante diseño de tablero plegable con compartimento interior para cada pieza. [DEMO - DISPONIBILIDAD POR CONFIRMAR]',
      categoryHandle: 'estrategia-y-rol',
      thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80',
      options: [
        {
          title: 'Tamaño',
          values: ['Mediano (29x29 cm)', 'Grande Torneo (39x39 cm)'],
        },
      ],
      variants: [
        {
          title: 'Mediano (29x29 cm)',
          sku: 'AJE-MED-29',
          manage_inventory: false,
          options: { Tamaño: 'Mediano (29x29 cm)' },
          prices: [{ amount: 27990, currency_code: 'clp' }],
        },
        {
          title: 'Grande Torneo (39x39 cm)',
          sku: 'AJE-GRD-39',
          manage_inventory: false,
          options: { Tamaño: 'Grande Torneo (39x39 cm)' },
          prices: [{ amount: 35990, currency_code: 'clp' }],
        },
      ],
    },
    {
      title: 'Fracciones y Cuerpos Geométricos en Madera',
      handle: 'fracciones-y-cuerpos-geometricos',
      subtitle: 'Herramienta sensorial para aprendizaje matemático [DEMO]',
      description:
        'Piezas de madera pulida con encastres magnéticos para comprender volumen y fracciones. [DEMO - DISPONIBILIDAD POR CONFIRMAR]',
      categoryHandle: 'material-didactico-stem',
      thumbnail: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
      options: [
        {
          title: 'Contenido',
          values: ['Set Elemental (36 Piezas)', 'Set Completo de Aula (72 Piezas)'],
        },
      ],
      variants: [
        {
          title: 'Set Elemental (36 Piezas)',
          sku: 'FRAC-ELEM-36',
          manage_inventory: false,
          options: { Contenido: 'Set Elemental (36 Piezas)' },
          prices: [{ amount: 15990, currency_code: 'clp' }],
        },
        {
          title: 'Set Completo de Aula (72 Piezas)',
          sku: 'FRAC-AULA-72',
          manage_inventory: false,
          options: { Contenido: 'Set Completo de Aula (72 Piezas)' },
          prices: [{ amount: 26990, currency_code: 'clp' }],
        },
      ],
    },
  ]

  const { data: existingProducts } = await query.graph({
    entity: 'product',
    fields: ['id', 'handle'],
  })
  const existingProductHandles = new Set(existingProducts.map((p: { handle: string }) => p.handle))

  const productsToCreate = []

  for (const prod of DEMO_PRODUCTS) {
    if (existingProductHandles.has(prod.handle)) {
      continue
    }

    const categoryId = categoryMap.get(prod.categoryHandle)

    productsToCreate.push({
      title: prod.title,
      handle: prod.handle,
      subtitle: prod.subtitle,
      description: prod.description,
      status: ProductStatus.PUBLISHED,
      thumbnail: prod.thumbnail,
      images: [{ url: prod.thumbnail }],
      shipping_profile_id: shippingProfile.id,
      sales_channels: [{ id: salesChannel.id }],
      category_ids: categoryId ? [categoryId] : [],
      options: prod.options,
      variants: prod.variants,
    })
  }

  if (productsToCreate.length > 0) {
    logger.info(`Creando ${productsToCreate.length} productos DEMO en CLP...`)
    await createProductsWorkflow(container).run({
      input: { products: productsToCreate as never },
    })
    logger.info('✅ Productos DEMO creados exitosamente.')
  } else {
    logger.info('Todos los productos DEMO ya están creados.')
  }

  logger.info('🎉 Seed DEMO Chile finalizado con éxito para Lúdicamente.')
  logger.info(`Resumen de Conexión:
  - Región: Chile (CLP)
  - Sales Channel: ${salesChannel.name} (ID: ${salesChannel.id})
  - Publishable API Key Token: ${publishableKey?.token}
  - Admin: admin@ludicamente.cl
  `)
}
