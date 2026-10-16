import type { MedusaProductTag } from "@/lib/medusa"

export interface DidacticSkillChip {
  id: string
  label: string
  icon: string
  bg: string
  text: string
  border: string
}

/**
 * Diccionario maestro de mapeo de etiquetas didácticas para Lúdicamente.
 * Normaliza cualquier texto ingresado en Medusa Admin y le asigna estilo y significado pedagógico.
 */
interface SkillDefinition {
  label: string
  icon: string
  bg: string
  text: string
  border: string
}

const SKILL_MAP: Record<string, SkillDefinition> = {
  // Metodologías Pedagógicas
  montessori: {
    label: "Método Montessori",
    icon: "🧠",
    bg: "#f3e9ff",
    text: "#4b347d",
    border: "#e3d0fa",
  },
  waldorf: {
    label: "Inspiración Waldorf",
    icon: "🌈",
    bg: "#fff0bd",
    text: "#7a5806",
    border: "#fce48b",
  },
  stem: {
    label: "Ciencia & STEM",
    icon: "🔬",
    bg: "#e3e9ff",
    text: "#2a4390",
    border: "#c8d7fc",
  },
  steam: {
    label: "Enfoque STEAM",
    icon: "🔭",
    bg: "#e3e9ff",
    text: "#2a4390",
    border: "#c8d7fc",
  },
  "juego libre": {
    label: "Juego Libre",
    icon: "🕊️",
    bg: "#dcf3e5",
    text: "#1b6b47",
    border: "#b8e8c8",
  },
  reggio: {
    label: "Reggio Emilia",
    icon: "🌱",
    bg: "#dcf3e5",
    text: "#1b6b47",
    border: "#b8e8c8",
  },

  // Habilidades y Desarrollo Infantil
  "motricidad fina": {
    label: "Motricidad Fina",
    icon: "🎯",
    bg: "#f3e9ff",
    text: "#4b347d",
    border: "#e3d0fa",
  },
  motricidad: {
    label: "Motricidad Fina",
    icon: "🎯",
    bg: "#f3e9ff",
    text: "#4b347d",
    border: "#e3d0fa",
  },
  pinza: {
    label: "Agarre & Pinza",
    icon: "🤏",
    bg: "#f3e9ff",
    text: "#4b347d",
    border: "#e3d0fa",
  },
  "motricidad gruesa": {
    label: "Motricidad Gruesa",
    icon: "🏃‍♂️",
    bg: "#ffdfcf",
    text: "#a3451e",
    border: "#f8c2ab",
  },
  concentracion: {
    label: "Concentración & Foco",
    icon: "🧩",
    bg: "#dcf3e5",
    text: "#1b6b47",
    border: "#b8e8c8",
  },
  foco: {
    label: "Concentración",
    icon: "🧩",
    bg: "#dcf3e5",
    text: "#1b6b47",
    border: "#b8e8c8",
  },
  creatividad: {
    label: "Creatividad & Arte",
    icon: "🎨",
    bg: "#fff0bd",
    text: "#7a5806",
    border: "#fce48b",
  },
  imaginacion: {
    label: "Imaginación Libre",
    icon: "✨",
    bg: "#fff0bd",
    text: "#7a5806",
    border: "#fce48b",
  },
  logica: {
    label: "Pensamiento Lógico",
    icon: "♟️",
    bg: "#f3e9ff",
    text: "#4b347d",
    border: "#e3d0fa",
  },
  estrategia: {
    label: "Estrategia & Desafío",
    icon: "🎲",
    bg: "#f3e9ff",
    text: "#4b347d",
    border: "#e3d0fa",
  },
  matematicas: {
    label: "Lógica Matemática",
    icon: "🔢",
    bg: "#e3e9ff",
    text: "#2a4390",
    border: "#c8d7fc",
  },
  numeros: {
    label: "Conteo & Números",
    icon: "🔢",
    bg: "#e3e9ff",
    text: "#2a4390",
    border: "#c8d7fc",
  },
  lenguaje: {
    label: "Lenguaje & Palabras",
    icon: "📖",
    bg: "#ffdfe6",
    text: "#8f2038",
    border: "#f8bcc8",
  },
  lectura: {
    label: "Lectoescritura",
    icon: "📚",
    bg: "#ffdfe6",
    text: "#8f2038",
    border: "#f8bcc8",
  },
  sensorial: {
    label: "Exploración Sensorial",
    icon: "🖐️",
    bg: "#fce4ce",
    text: "#914d18",
    border: "#fad1af",
  },
  emociones: {
    label: "Educación Emocional",
    icon: "💛",
    bg: "#ffdfe6",
    text: "#8f2038",
    border: "#f8bcc8",
  },
  cooperativo: {
    label: "Juego Cooperativo",
    icon: "🤝",
    bg: "#dcf3e5",
    text: "#1b6b47",
    border: "#b8e8c8",
  },
  "en familia": {
    label: "Juego en Familia",
    icon: "🤝",
    bg: "#dcf3e5",
    text: "#1b6b47",
    border: "#b8e8c8",
  },
  memoria: {
    label: "Memoria & Agilidad",
    icon: "⚡",
    bg: "#fff0bd",
    text: "#7a5806",
    border: "#fce48b",
  },

  // Materiales y Filosofía
  madera: {
    label: "Madera Sustentable",
    icon: "🪵",
    bg: "#ffdfcf",
    text: "#a3451e",
    border: "#f8c2ab",
  },
  "sin pantallas": {
    label: "100% Sin Pantallas",
    icon: "🌿",
    bg: "#dcf3e5",
    text: "#1b6b47",
    border: "#b8e8c8",
  },
  "no toxico": {
    label: "Pintura No Tóxica",
    icon: "💧",
    bg: "#e3e9ff",
    text: "#2a4390",
    border: "#c8d7fc",
  },
  "punta arenas": {
    label: "Favorito Magallanes",
    icon: "🐧",
    bg: "#ffd678",
    text: "#4b347d",
    border: "#f7c756",
  },
  magallanes: {
    label: "Stock Punta Arenas",
    icon: "❄️",
    bg: "#ffd678",
    text: "#4b347d",
    border: "#f7c756",
  },
}

// Estilos pasteles para etiquetas personalizadas no listadas en el diccionario
const FALLBACK_PALETTES = [
  { bg: "#f3e9ff", text: "#4b347d", border: "#e3d0fa" },
  { bg: "#dcf3e5", text: "#1b6b47", border: "#b8e8c8" },
  { bg: "#fff0bd", text: "#7a5806", border: "#fce48b" },
  { bg: "#ffdfe6", text: "#8f2038", border: "#f8bcc8" },
  { bg: "#ffdfcf", text: "#a3451e", border: "#f8c2ab" },
  { bg: "#e3e9ff", text: "#2a4390", border: "#c8d7fc" },
]

function normalizeKey(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[-_]/g, " ")
    .trim()
}

/**
 * Convierte las etiquetas de Medusa en chips didácticos listos para renderizar.
 * Si el producto no tiene etiquetas asignadas en Medusa, devuelve los 4 pilares predeterminados.
 */
export function getProductSkillChips(
  tags?: MedusaProductTag[],
  categoryName?: string
): DidacticSkillChip[] {
  if (tags && tags.length > 0) {
    return tags.map((t, idx) => {
      const rawValue = t.value || ""
      const normalized = normalizeKey(rawValue)
      const matched = SKILL_MAP[normalized]

      if (matched) {
        return {
          id: t.id || `tag-${idx}`,
          label: matched.label,
          icon: matched.icon,
          bg: matched.bg,
          text: matched.text,
          border: matched.border,
        }
      }

      // Etiqueta personalizada creada por el admin en Medusa
      const palette = FALLBACK_PALETTES[idx % FALLBACK_PALETTES.length]
      // Capitalizar palabra
      const capitalized =
        rawValue.charAt(0).toUpperCase() + rawValue.slice(1).toLowerCase()

      return {
        id: t.id || `tag-${idx}`,
        label: capitalized,
        icon: "✨",
        bg: palette.bg,
        text: palette.text,
        border: palette.border,
      }
    })
  }

  // Fallback inteligente cuando el producto no tiene etiquetas en Medusa
  return [
    {
      id: "default-1",
      label: "Motricidad Fina",
      icon: "🎯",
      bg: "#f3e9ff",
      text: "#4b347d",
      border: "#e3d0fa",
    },
    {
      id: "default-2",
      label: "Concentración",
      icon: "🧩",
      bg: "#dcf3e5",
      text: "#1b6b47",
      border: "#b8e8c8",
    },
    {
      id: "default-3",
      label: "Creatividad",
      icon: "🎨",
      bg: "#fff0bd",
      text: "#7a5806",
      border: "#fce48b",
    },
    {
      id: "default-4",
      label: "En Familia",
      icon: "🤝",
      bg: "#ffdfe6",
      text: "#8f2038",
      border: "#f8bcc8",
    },
  ]
}
