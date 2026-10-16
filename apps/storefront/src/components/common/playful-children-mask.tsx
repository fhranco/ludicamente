"use client"

import React, { useId, useState } from "react"

export type PlayfulShapeType = "cloud" | "flower" | "puzzle" | "bear" | "star" | "stamp"

interface PlayfulChildrenMaskProps {
  src?: string | null
  alt: string
  shapeIndex?: number
  className?: string
  priority?: boolean
}

// 1. NUBE INFANTIL ESPONJOSA (Cloud)
const CLOUD_PATH = `
  M 45 150
  C 20 150 8 132 8 110
  C 8 88 24 74 48 72
  C 52 46 76 26 104 26
  C 128 26 148 40 156 60
  C 172 52 192 64 194 86
  C 198 106 188 128 172 138
  C 182 146 178 162 160 164
  C 146 166 65 166 45 150
  Z
`.replace(/\s+/g, " ").trim()

// 2. FLOR MARGARITA / GALLETA DE 8 PÉTALOS (Daisy / Flower)
function generateFlowerPath(cx = 100, cy = 100, rBase = 76, rAmp = 18, petals = 8) {
  const pts: { x: number; y: number }[] = []
  const steps = 72
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI
    const r = rBase + rAmp * Math.cos(petals * angle)
    const x = +(cx + r * Math.cos(angle)).toFixed(1)
    const y = +(cy + r * Math.sin(angle)).toFixed(1)
    pts.push({ x, y })
  }
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x} ${pts[i].y}`
  }
  return d + " Z"
}
const FLOWER_PATH = generateFlowerPath()

// 3. PIEZA DE ROMPECABEZAS DIDÁCTICO (Puzzle Piece)
const PUZZLE_PATH = `
  M 32 36
  C 32 26 38 20 48 20
  L 76 20
  C 78 8 88 4 100 4
  C 112 4 122 8 124 20
  L 152 20
  C 162 20 168 26 168 36
  L 168 76
  C 180 78 196 88 196 100
  C 196 112 180 122 168 124
  L 168 152
  C 168 162 162 168 152 168
  L 124 168
  C 122 156 112 148 100 148
  C 88 148 78 156 76 168
  L 48 168
  C 38 168 32 162 32 152
  L 32 124
  C 44 122 52 112 52 100
  C 52 88 44 78 32 76
  Z
`.replace(/\s+/g, " ").trim()

// 4. OSITO TIERNO CON OREJITAS (Teddy Bear)
const BEAR_PATH = `
  M 48 68
  C 28 68 10 52 10 32
  C 10 12 34 2 56 12
  C 68 18 74 30 76 44
  C 84 40 92 38 100 38
  C 108 38 116 40 124 44
  C 126 30 132 18 144 12
  C 166 2 190 12 190 32
  C 190 52 172 68 152 68
  C 176 88 190 114 190 138
  C 190 172 150 194 100 194
  C 50 194 10 172 10 138
  C 10 114 24 88 48 68
  Z
`.replace(/\s+/g, " ").trim()

// 5. ESTRELLA INFANTIL SUAVE (Plush 5-point Star)
function generateStarPath(cx = 100, cy = 102, rOuter = 90, rInner = 58, points = 5) {
  const pts: { x: number; y: number }[] = []
  const steps = 60
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI - Math.PI / 2
    const cycle = (i / steps) * points * 2 * Math.PI
    const r = rInner + (rOuter - rInner) * (0.5 + 0.5 * Math.cos(cycle))
    const x = +(cx + r * Math.cos(angle)).toFixed(1)
    const y = +(cy + r * Math.sin(angle)).toFixed(1)
    pts.push({ x, y })
  }
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x} ${pts[i].y}`
  }
  return d + " Z"
}
const STAR_PATH = generateStarPath()

// 6. SELLO POSTAL ONDULADO / ESTAMPILLA FESTONEADA (Scalloped Stamp)
const STAMP_PATH = `
  M 18 18
  Q 34 6 50 18 Q 66 6 82 18 Q 98 6 114 18 Q 130 6 146 18 Q 162 6 178 18
  C 188 18 194 24 194 34
  Q 182 50 194 66 Q 182 82 194 98 Q 182 114 194 130 Q 182 146 194 162
  C 194 174 188 180 178 180
  Q 162 192 146 180 Q 130 192 114 180 Q 98 192 82 180 Q 66 192 50 180 Q 34 192 18 180
  C 8 180 6 174 6 162
  Q 18 146 6 130 Q 18 114 6 98 Q 18 82 6 66 Q 18 50 6 34
  C 6 24 8 18 18 18
  Z
`.replace(/\s+/g, " ").trim()

export const PLAYFUL_SHAPES_DATA = [
  {
    type: "cloud" as PlayfulShapeType,
    name: "Nube de Algodón ☁️",
    path: CLOUD_PATH,
    tapeColor: "#ffd678", // Amarillo Sol
    tapeRotate: "-rotate-6",
    tapePosition: "top-2 left-6",
    cardRotate: "-rotate-2",
  },
  {
    type: "flower" as PlayfulShapeType,
    name: "Flor Margarita 🌸",
    path: FLOWER_PATH,
    tapeColor: "#ffb4a2", // Coral Suave
    tapeRotate: "rotate-12",
    tapePosition: "top-2 right-6",
    cardRotate: "rotate-2",
  },
  {
    type: "puzzle" as PlayfulShapeType,
    name: "Pieza Rompecabezas 🧩",
    path: PUZZLE_PATH,
    tapeColor: "#ecf19f", // Verde Menta
    tapeRotate: "-rotate-4",
    tapePosition: "top-2 left-1/2 -translate-x-1/2",
    cardRotate: "-rotate-3",
  },
  {
    type: "bear" as PlayfulShapeType,
    name: "Orejitas de Osito 🐻",
    path: BEAR_PATH,
    tapeColor: "#ffd678",
    tapeRotate: "rotate-6",
    tapePosition: "top-2 left-1/2 -translate-x-1/2",
    cardRotate: "rotate-1",
  },
  {
    type: "star" as PlayfulShapeType,
    name: "Estrella Juguetona ⭐",
    path: STAR_PATH,
    tapeColor: "#a2d2ff", // Celeste Austral
    tapeRotate: "-rotate-6",
    tapePosition: "top-2 right-8",
    cardRotate: "-rotate-2",
  },
  {
    type: "stamp" as PlayfulShapeType,
    name: "Sello Troquelado 💌",
    path: STAMP_PATH,
    tapeColor: "#ffd678",
    tapeRotate: "rotate-6",
    tapePosition: "top-2 left-6",
    cardRotate: "rotate-2",
  },
]

export function PlayfulChildrenMask({
  src,
  alt,
  shapeIndex = 0,
  className = "",
}: PlayfulChildrenMaskProps) {
  const reactId = useId()
  const cleanId = reactId.replace(/[^a-zA-Z0-9_-]/g, "")
  const maskId = `ludica-mask-${cleanId}-${shapeIndex}`
  const [hasError, setHasError] = useState(false)

  const shape = PLAYFUL_SHAPES_DATA[shapeIndex % PLAYFUL_SHAPES_DATA.length]

  return (
    <div className={`relative w-full h-full grid place-items-center select-none ${className}`}>
      {/* Cinta Adhesiva Washi Tape con inclinación infantil */}
      <div
        style={{ backgroundColor: shape.tapeColor }}
        className={`absolute ${shape.tapePosition} ${shape.tapeRotate} z-20 w-12 h-3.5 rounded-[2px] opacity-85 shadow-[0_2px_4px_rgba(0,0,0,0.12)] border-t border-b border-black/5 pointer-events-none`}
      />

      {/* Contenedor SVG con silueta recortada, borde blanco de calcomanía y pespunte Montessori */}
      <div
        className={`relative w-[185px] h-[185px] sm:w-[195px] sm:h-[195px] max-w-[88%] max-h-[88%] aspect-square ${shape.cardRotate} group-hover:scale-105 group-hover:rotate-0 transition-all duration-500`}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full overflow-visible drop-shadow-[0_12px_24px_rgba(75,52,125,0.14)]"
          aria-label={alt}
        >
          <defs>
            <clipPath id={maskId}>
              <path d={shape.path} />
            </clipPath>
          </defs>

          {/* 1. Base sólida blanca que respalda la imagen */}
          <path d={shape.path} fill="#ffffff" />

          {/* 2. Borde exterior blanco grueso tipo calcomanía troquelada (Sticker Border) */}
          <path
            d={shape.path}
            fill="none"
            stroke="#ffffff"
            strokeWidth="14"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* 3. Imagen del producto recortada con la máscara exacta */}
          {src && !hasError ? (
            <image
              href={src}
              xlinkHref={src}
              x="0"
              y="0"
              width="200"
              height="200"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${maskId})`}
              className="transition-transform duration-500 group-hover:scale-105"
              onError={() => setHasError(true)}
            />
          ) : (
            <g clipPath={`url(#${maskId})`}>
              <rect width="200" height="200" fill="#fdf5ec" />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fontSize="38"
                fill="#4b347d"
              >
                🎲
              </text>
              <text
                x="100"
                y="135"
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="#4b347d"
                fontFamily="sans-serif"
              >
                Lúdicamente
              </text>
            </g>
          )}

          {/* 4. Pespunte artesanal / costura didáctica suave */}
          <path
            d={shape.path}
            fill="none"
            stroke="#4b347d"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            strokeLinejoin="round"
            strokeOpacity="0.22"
          />

          {/* 5. Destello sutil de relieve exterior */}
          <path
            d={shape.path}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  )
}
