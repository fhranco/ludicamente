import type { MedusaProduct, MedusaProductCategory } from "./medusa"

export const FALLBACK_CATEGORIES: MedusaProductCategory[] = [
  {
    id: "cat_mesa",
    name: "Juegos de Mesa Familiares",
    handle: "juegos-de-mesa-familiares",
    description: "Diversión para compartir entre grandes y chicos con reglas accesibles.",
  },
  {
    id: "cat_estrategia",
    name: "Estrategia y Rol",
    handle: "estrategia-y-rol",
    description: "Desafíos tácticos, gestión de recursos e inmersión narrativa.",
  },
  {
    id: "cat_puzzles",
    name: "Puzzles y Rompecabezas",
    handle: "puzzles-y-rompecabezas",
    description: "Concentración, paciencia y arte en piezas de alta calidad.",
  },
  {
    id: "cat_madera",
    name: "Estimulación Temprana y Madera",
    handle: "estimulacion-temprana-madera",
    description: "Materiales nobles, motricidad fina y texturas cálidas para la primera infancia.",
  },
  {
    id: "cat_stem",
    name: "Material Didáctico y STEM",
    handle: "material-didactico-stem",
    description: "Ciencia, tecnología, matemáticas y exploración pedagógica.",
  },
  {
    id: "cat_cartas",
    name: "Juegos de Cartas y Viaje",
    handle: "juegos-de-cartas-viaje",
    description: "Portátiles, ágiles y perfectos para llevar en vacaciones y encuentros.",
  },
]

export const FALLBACK_PRODUCTS: MedusaProduct[] = [
  {
    id: "prod_catan",
    title: "Catán: Edición Clásica",
    handle: "catan-edicion-clasica",
    subtitle: "El clásico mundial de negociación y colonización",
    description:
      "Construye caminos, poblados y ciudades negociando lana, madera, trigo y mineral. Ideal para 3 a 4 jugadores desde 9 años.",
    thumbnail:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_catan_1",
        url: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[1]],
    tags: [
      { id: "t1", value: "estrategia" },
      { id: "t2", value: "familia" },
      { id: "t3", value: "juegos-de-mesa" },
      { id: "t4", value: "9+" },
    ],
    variants: [
      {
        id: "var_catan",
        title: "Estándar Español",
        sku: "CAT-CLAS-ES",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 34990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_dixit",
    title: "Dixit: El Arte de Contar Historias",
    handle: "dixit-el-arte-de-contar-historias",
    subtitle: "Juego poético y visual de deducción e imaginación",
    description:
      "Cada carta evoca una historia enigmática ilustrada con poesía visual. El juego perfecto para toda la familia.",
    thumbnail:
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_dixit_1",
        url: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[0]],
    tags: [
      { id: "t5", value: "creatividad" },
      { id: "t6", value: "familia" },
      { id: "t7", value: "cartas" },
      { id: "t8", value: "6-8" },
      { id: "t9", value: "3-5" },
    ],
    variants: [
      {
        id: "var_dixit",
        title: "Edición Clásica (84 Cartas)",
        sku: "DIX-CLAS-84",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 29990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_torre",
    title: "Torre de Equilibrio en Madera Nativa",
    handle: "torre-de-equilibrio-madera-nativa",
    subtitle: "54 bloques de madera pulida para pulso y tensión",
    description:
      "Madera suave al tacto con bordes redondeados para horas de entretenimiento seguro y desarrollo motriz.",
    thumbnail:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_torre_1",
        url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[3]],
    tags: [
      { id: "t10", value: "madera" },
      { id: "t11", value: "motricidad" },
      { id: "t12", value: "equilibrio" },
      { id: "t13", value: "3-5" },
      { id: "t14", value: "6-8" },
    ],
    variants: [
      {
        id: "var_torre",
        title: "Madera Natural Pulida",
        sku: "TOR-NAT-54",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 16990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_robot",
    title: "Kit Científico de Robótica Solar STEM",
    handle: "kit-robotica-solar-stem",
    subtitle: "Educación tecnológica práctica y energías limpias",
    description:
      "Aprende mecánica, circuitos y captación fotovoltaica armando modelos funcionales sin pilas ni cables.",
    thumbnail:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_robot_1",
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[4]],
    tags: [
      { id: "t15", value: "stem" },
      { id: "t16", value: "ciencia" },
      { id: "t17", value: "robotica" },
      { id: "t18", value: "9+" },
      { id: "t19", value: "6-8" },
    ],
    variants: [
      {
        id: "var_robot",
        title: "Kit 6 en 1 Inicial",
        sku: "ROB-SOL-06",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 24990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_puzzle",
    title: "Puzzle Artístico 1000 Piezas — Bosque Lluvioso",
    handle: "puzzle-artistico-bosque-lluvioso",
    subtitle: "Ilustración botánica en cartón reciclado extra-grueso",
    description:
      "Corte de precisión con encaje perfecto y acabado mate antirreflejo. Hermosa lámina para armar y enmarcar.",
    thumbnail:
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_puzzle_1",
        url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[2]],
    tags: [
      { id: "t20", value: "puzzle" },
      { id: "t21", value: "arte" },
      { id: "t22", value: "concentracion" },
      { id: "t23", value: "9+" },
    ],
    variants: [
      {
        id: "var_puzzle",
        title: "1000 Piezas",
        sku: "PUZ-BOSQ-1000",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 14990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_dobble",
    title: "Dobble: Juego de Reflejos y Percepción",
    handle: "dobble-juego-de-reflejos",
    subtitle: "Encuentra el símbolo idéntico antes que tus rivales",
    description:
      "Lata metálica de viaje con 55 cartas y 5 modos de juego ultra dinámicos para jugar en cualquier lugar.",
    thumbnail:
      "https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_dobble_1",
        url: "https://images.unsplash.com/photo-1563941402622-4e7a488bcc57?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[5]],
    tags: [
      { id: "t24", value: "cartas" },
      { id: "t25", value: "reflejos" },
      { id: "t26", value: "viaje" },
      { id: "t27", value: "6-8" },
      { id: "t28", value: "3-5" },
    ],
    variants: [
      {
        id: "var_dobble",
        title: "Clásico en Lata",
        sku: "DOB-CLAS-55",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 12990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_ajedrez",
    title: "Ajedrez Artesanal Magnético Plegable",
    handle: "ajedrez-artesanal-magnetico",
    subtitle: "Tablero de madera con piezas ponderadas y fieltro",
    description:
      "Elegante diseño de tablero plegable en madera con compartimento interior acolchado para cada pieza.",
    thumbnail:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_ajedrez_1",
        url: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[1]],
    tags: [
      { id: "t29", value: "ajedrez" },
      { id: "t30", value: "madera" },
      { id: "t31", value: "estrategia" },
      { id: "t32", value: "6-8" },
      { id: "t33", value: "9+" },
    ],
    variants: [
      {
        id: "var_ajedrez",
        title: "Mediano (29x29 cm)",
        sku: "AJE-MED-29",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 27990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_fracciones",
    title: "Fracciones y Cuerpos Geométricos en Madera",
    handle: "fracciones-y-cuerpos-geometricos",
    subtitle: "Herramienta sensorial para aprendizaje matemático",
    description:
      "Piezas de madera pulida con encastres magnéticos para comprender volumen, fracciones y geometría táctil.",
    thumbnail:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_fracciones_1",
        url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[4]],
    tags: [
      { id: "t34", value: "matematica" },
      { id: "t35", value: "madera" },
      { id: "t36", value: "sensorial" },
      { id: "t37", value: "3-5" },
      { id: "t38", value: "6-8" },
    ],
    variants: [
      {
        id: "var_fracciones",
        title: "Set Elemental (36 Piezas)",
        sku: "FRAC-ELEM-36",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 15990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_sonajero",
    title: "Sonajero & Mordedor Sensorial de Madera Montessori",
    handle: "sonajero-mordedor-madera-montessori",
    subtitle: "Madera de haya natural no tratada y libre de BPA",
    description:
      "Diseño ergonómico para manos pequeñas, estimula el reflejo de agarre, audición y calma la dentición de forma 100% natural.",
    thumbnail:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_sonajero_1",
        url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[3]],
    tags: [
      { id: "t39", value: "primera-infancia" },
      { id: "t40", value: "bebe" },
      { id: "t41", value: "madera" },
      { id: "t42", value: "sensorial" },
      { id: "t43", value: "0-2" },
    ],
    variants: [
      {
        id: "var_sonajero",
        title: "Madera Natural",
        sku: "SON-MONT-01",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 9990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_bloques",
    title: "Bloques Sensoriales de Construcción Arcoíris",
    handle: "bloques-sensoriales-arcoiris-madera",
    subtitle: "24 piezas de madera maciza con acrílico translúcido",
    description:
      "Explora la luz, los colores y el equilibrio. Al mirar a través de ellos, los niños descubren un mundo teñido de arcoíris.",
    thumbnail:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_bloques_1",
        url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[3]],
    tags: [
      { id: "t44", value: "madera" },
      { id: "t45", value: "colores" },
      { id: "t46", value: "motricidad" },
      { id: "t47", value: "0-2" },
      { id: "t48", value: "3-5" },
    ],
    variants: [
      {
        id: "var_bloques",
        title: "Set 24 Piezas",
        sku: "BLOQ-ARC-24",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 21990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_acuarelas",
    title: "Acuarelas Ecológicas Lavables con Pinceles de Madera",
    handle: "set-acuarelas-ecologicas-infantiles",
    subtitle: "Pigmentos naturales a base de vegetales y no tóxicos",
    description:
      "Fórmula ultra lavable en ropa y manos. Incluye 12 pastillas de colores intensos y 2 pinceles de cerdas suaves.",
    thumbnail:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_acuarelas_1",
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[4]],
    tags: [
      { id: "t49", value: "arte" },
      { id: "t50", value: "creatividad" },
      { id: "t51", value: "manualidades" },
      { id: "t52", value: "3-5" },
      { id: "t53", value: "6-8" },
    ],
    variants: [
      {
        id: "var_acuarelas",
        title: "Caja Metálica 12 Colores",
        sku: "ACU-ECO-12",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 11990,
          currency_code: "clp",
        },
      },
    ],
  },
  {
    id: "prod_microscopio",
    title: "Microscopio Infantil de Campo con Luz LED 100x",
    handle: "microscopio-infantil-campo-led",
    subtitle: "Óptica de aumento real portátil para explorar la naturaleza",
    description:
      "Compacto y resistente, permite observar hojas, minerales, fibras e insectos con aumento de 60x a 100x en terreno.",
    thumbnail:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img_microscopio_1",
        url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: [FALLBACK_CATEGORIES[4]],
    tags: [
      { id: "t54", value: "ciencia" },
      { id: "t55", value: "exploracion" },
      { id: "t56", value: "stem" },
      { id: "t57", value: "6-8" },
      { id: "t58", value: "9+" },
    ],
    variants: [
      {
        id: "var_microscopio",
        title: "Edición Explorador LED",
        sku: "MIC-LED-100",
        manage_inventory: false,
        calculated_price: {
          calculated_amount: 28990,
          currency_code: "clp",
        },
      },
    ],
  },
]
