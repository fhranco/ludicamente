"use client"

import React from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex items-center justify-center bg-[#FFF9F0] text-[#263640] p-6 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E8DDCF] shadow-lg text-center space-y-4">
          <span className="w-12 h-12 rounded-2xl bg-[#EF745B]/10 text-[#EF745B] flex items-center justify-center mx-auto text-xl font-bold">
            !
          </span>
          <h2 className="text-2xl font-extrabold text-[#263640]">
            Algo inesperado ocurrió
          </h2>
          <p className="text-sm text-[#5A6B75] leading-relaxed">
            Estamos optimizando la experiencia didáctica. Puedes reintentar cargar la página o consultar directamente por WhatsApp.
          </p>
          <button
            onClick={() => reset()}
            className="w-full bg-[#137D84] hover:bg-[#0E6167] text-white py-3 px-4 rounded-xl font-bold text-sm shadow transition-all"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  )
}
