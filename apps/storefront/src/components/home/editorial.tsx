import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "@/components/ui/icons"

export function Editorial() {
  return (
    <section className="py-20 sm:py-24 bg-[#FFF6EE] overflow-hidden select-none border-y border-[#f0dfd2]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Columna Izquierda: Fotografía Madre e Hija con Corazón Coral en tamaño grande */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[560px]">
              {/* Corazón Coral Vectorial Flotante */}
              <div
                className="absolute -top-8 -right-3 sm:-right-6 w-16 sm:w-20 h-auto z-20 pointer-events-none drop-shadow-xs rotate-12"
                aria-hidden="true"
              >
                <Image
                  src="/home/decorations/corazon-coral.svg"
                  alt=""
                  width={76}
                  height={70}
                  className="w-full h-auto"
                />
              </div>

              {/* Fotografía recortada con fondo transparente destacada en grande (aspect 1200/805 ~ 1.49) */}
              <div className="relative w-full aspect-[1200/805] flex items-center justify-center">
                <Image
                  src="/home/photos/mama-hija-juego-mesa.webp"
                  alt="Madre e hija compartiendo y sonriendo mientras juegan juntas un juego de mesa de madera"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-contain drop-shadow-[0_18px_32px_rgba(75,52,125,0.14)]"
                />
              </div>
            </div>
          </div>

          {/* Columna Derecha: Texto Editorial, Rayitas y CTA */}
          <div className="order-1 lg:order-2 space-y-5 text-center lg:text-left relative">
            {/* Rayitas moradas decorativas en la parte superior derecha */}
            <div className="hidden sm:block absolute -top-4 right-12 w-8 h-8 pointer-events-none" aria-hidden="true">
              <Image
                src="/home/decorations/rayitas-moradas.svg"
                alt=""
                width={32}
                height={32}
                className="w-full h-auto"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#ecd8c6] text-[#fa795f] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase shadow-xs">
              <span>✦</span>
              <span>JUEGOS QUE DEJAN HUELLA</span>
              <span>✦</span>
            </div>

            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[3.6rem] leading-[1.08] tracking-[-0.04em] text-[#2d2943] max-w-[560px] mx-auto lg:mx-0">
              Los mejores recuerdos no necesitan{" "}
              <span className="text-[#fa795f]">batería.</span>
            </h2>

            <p className="text-[#6d6475] text-base sm:text-[1.05rem] font-semibold leading-[1.75] max-w-[500px] mx-auto lg:mx-0">
              Los juegos de mesa, rompecabezas y actividades creativas nos conectan de verdad. Conversaciones, risas y tiempo juntos que se transforman en recuerdos para toda la vida.
            </p>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-2.5 bg-[#39265B] hover:bg-[#2d1e48] text-white px-7 py-3.5 sm:py-4 rounded-full font-extrabold text-[0.94rem] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span>Conoce nuestra selección</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Estrella amarilla decorativa */}
              <div className="w-8 h-8 pointer-events-none" aria-hidden="true">
                <Image
                  src="/home/decorations/estrella-amarilla.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
