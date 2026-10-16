import React from "react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#392b60] text-white pt-16 sm:pt-20 pb-8 overflow-hidden select-none">
      {/* Marca de agua ✳ gigante en esquina superior */}
      <div
        className="absolute -right-20 -top-36 text-white/[0.04] text-[400px] sm:text-[450px] font-display select-none pointer-events-none leading-none -z-0"
        aria-hidden="true"
      >
        ✳
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.85fr_0.85fr_1.05fr] gap-10 lg:gap-12 pb-14 border-b border-white/15">
          {/* Columna Marca */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="w-10 h-10 relative -rotate-[10deg] group-hover:rotate-0 transition-transform">
                <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
                  <path
                    d="M31 2c7 0 9 10 9 10s11-4 15 2c4 6-3 14-3 14s10 5 9 13c-1 7-13 8-13 8s-1 12-9 13c-7 1-13-9-13-9s-10 7-16 2C5 50 9 40 9 40S-1 34 2 27c3-7 14-7 14-7S17 3 25 3l6-1Z"
                    fill="#ffd678"
                    stroke="#4b347d"
                    strokeWidth="2.3"
                  />
                  <circle cx="24" cy="29" r="3" fill="#4b347d" />
                  <circle cx="40" cy="29" r="3" fill="#4b347d" />
                  <path
                    d="M25 39q8 9 16 0"
                    fill="none"
                    stroke="#4b347d"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 17l-3-4M49 17l3-5"
                    stroke="#fa795f"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-[-0.046em] text-white">
                  ludi<span className="text-[#fa795f]">ca</span>mente
                </span>
                <small className="block font-extrabold text-[0.52rem] tracking-[0.23em] text-[#bcafcf] mt-1 uppercase">
                  Juegos con sentido
                </small>
              </div>
            </Link>

            <p className="text-[#c9c0d5] text-[0.86rem] font-semibold leading-[1.7] max-w-xs">
              Una tienda para imaginar, jugar y encontrar razones para pasar más tiempo creando juntos en familia y comunidad.
            </p>
          </div>

          {/* Columna Explora */}
          <div>
            <h3 className="font-display font-semibold text-lg text-white mb-4">
              Explora
            </h3>
            <ul className="space-y-3 text-[0.85rem] font-bold text-[#cfc7d8]">
              <li>
                <a href="#categorias" className="hover:text-[#ffd678] transition-colors">
                  Categorías
                </a>
              </li>
              <li>
                <a href="#favoritos" className="hover:text-[#ffd678] transition-colors">
                  Nuestros favoritos
                </a>
              </li>
              <li>
                <a href="#edades" className="hover:text-[#ffd678] transition-colors">
                  Juegos por edad
                </a>
              </li>
              <li>
                <a href="#filosofia" className="hover:text-[#ffd678] transition-colors">
                  Quiénes somos
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Te ayudamos */}
          <div>
            <h3 className="font-display font-semibold text-lg text-white mb-4">
              Te ayudamos
            </h3>
            <ul className="space-y-3 text-[0.85rem] font-bold text-[#cfc7d8]">
              <li>
                <a href="#club" className="hover:text-[#ffd678] transition-colors">
                  Club de ideas
                </a>
              </li>
              <li>
                <a href="#favoritos" className="hover:text-[#ffd678] transition-colors">
                  Ideas para regalar
                </a>
              </li>
              <li>
                <a href="#filosofia" className="hover:text-[#ffd678] transition-colors">
                  Nuestra mirada
                </a>
              </li>
              <li>
                <a href="#inicio" className="hover:text-[#ffd678] transition-colors">
                  Volver al inicio
                </a>
              </li>
            </ul>
          </div>

          {/* Mini Box Destacado */}
          <div>
            <div className="bg-white/10 rounded-[19px] p-5 text-white/90">
              <strong className="block font-display font-semibold text-base sm:text-[1.2rem]">
                ✳ ¡Que el juego no pare!
              </strong>
              <p className="text-[0.8rem] text-[#cfc7d8] font-semibold mt-2 leading-relaxed">
                Catálogo curado para familias y docentes en todo Chile. Precios reales en pesos chilenos y cotización directa por WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Inferior */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-[#b4a9c6]">
          <span>© {currentYear} Ludicamente · Todos los derechos reservados.</span>
          <span>Despachos coordinados a todo Chile · Conectado a Medusa v2</span>
        </div>
      </div>
    </footer>
  )
}
